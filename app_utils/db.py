from fastapi import HTTPException
from dotenv import load_dotenv
import psycopg2
import os

def get_db_connection():
    """Função que retorna a conexão com o banco de dados

    Returns:
        connection: Conexão com o DB
    """
    load_dotenv()
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")
    )
    
def save_to_database(profile:dict = {},posts:list = [],comments:list = []):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Erro ao conectar-se ao bando de dados !")
    
    try:
                
        cursor.execute("""
            SELECT id FROM lb_users WHERE id = %s
        """, (profile['id'],))
        
        user_exists = cursor.fetchone()
        
        if user_exists:
            cursor.execute("""
                DELETE FROM lb_users WHERE id = %s
            """, (profile['id'],))
            print(f"Atualizado usuario {profile['id']}")
        
        cursor.execute("""
            INSERT INTO lb_users (id, username, user_fullname, user_picture, is_training)
            VALUES (%(id)s, %(username)s, %(user_fullname)s, %(user_picture)s, %(is_training)s)
            ON CONFLICT (id) DO NOTHING
        """, profile)

        insert_posts_query = """
            INSERT INTO lb_posts (id, at_insta, post_url, thumb_url, post_text, user_id)
            VALUES (%(id)s, %(at_insta)s, %(post_url)s, %(thumb_url)s, %(post_text)s, %(user_id)s)
        """
        cursor.executemany(insert_posts_query, posts)

        insert_comments_query = """
            INSERT INTO lb_comments (id, at_insta, comment_text, classification, verified_class, post_id)
            VALUES (%(id)s, %(at_insta)s, %(comment_text)s, %(classification)s, %(verified_class)s, %(post_id)s)
        """
        cursor.executemany(insert_comments_query, comments)

        conn.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Erro ao salvar dados no banco de dados !")
    
    finally:
        cursor.close()
        conn.close()
    
    return True