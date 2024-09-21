from fastapi import FastAPI, HTTPException
import psycopg2
from dotenv import load_dotenv
import os
import requests
import emoji

from mock import profile, posts,comments

load_dotenv()

app = FastAPI()

def get_db_connection():
    
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
            INSERT INTO lb_users (id, username, user_fullname, user_picture)
            VALUES (%(id)s, %(username)s, %(user_fullname)s, %(user_picture)s)
            ON CONFLICT (id) DO NOTHING
        """, profile)

        insert_posts_query = """
            INSERT INTO lb_posts (id, at_insta, post_url, thumb_url, post_text, user_id)
            VALUES (%(id)s, %(at_insta)s, %(post_url)s, %(thumb_url)s, %(post_text)s, %(user_id)s)
        """
        cursor.executemany(insert_posts_query, posts)

        insert_comments_query = """
            INSERT INTO lb_comments (id, at_insta, comment_text, classification, post_id)
            VALUES (%(id)s, %(at_insta)s, %(comment_text)s, %(classification)s, %(post_id)s)
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

def clean_comment_text(text: str) -> str:
    cleaned_text = emoji.replace_emoji(text, replace='')
    cleaned_text = cleaned_text.strip()
    return cleaned_text
    
def fetch_profile_posts(username:str = ''):
    
    params = {'username_or_id_or_url':username}
    
    headers = {
            'x-rapidapi-host' : 'instagram-scraper-api2.p.rapidapi.com',
            'x-rapidapi-key': os.getenv("RAPID_API_KEY")
            }
    
    r = requests.get('https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts', params=params, headers=headers)
    
    if r.status_code == 404:
        raise HTTPException(status_code=404, detail="Usuário não encontrado !")
    
    r.raise_for_status()    
    data = r.json()
    
    id = data.get('data', {}).get('user',{}).get('id','')
    
    profile = {
        'id' : id, 
        'username' : username, 
        'user_fullname' : data.get('data', {}).get('user',{}).get('full_name',''),
        'user_picture' : data.get('data', {}).get('user',{}).get('profile_pic_url','')
    } 
    
    raw_posts = data.get('data', {}).get('items',[])

    posts = []
    
    for raw_post in raw_posts:        
        
        if raw_post.get('caption') is not None:
            if raw_post.get('caption',{}).get('content_type') == 'comment':
                post_text = clean_comment_text(raw_post.get('caption',{}).get('text'))
            else:
                post_text = ''   

        post = {
            'id': raw_post.get('id',''),
            'at_insta' : raw_post.get('taken_at',''),
            'post_url' : f'https://www.instagram.com/p/{raw_post.get("code","")}',
            'thumb_url' : raw_post.get('thumbnail_url',''),
            'post_text':  post_text,
            'user_id' :  id,
        }

        posts.append(post)
        
    return profile, posts

def fetch_comments(posts:list = []):
    
    comments = []
    
    print('POSTS')
    print(posts)
    
    for post in posts:
        
        id = post['id']

        print('ID DO POST')
        print(id)

        params = {'code_or_id_or_url':id}
    
        headers = {
                'x-rapidapi-host' : 'instagram-scraper-api2.p.rapidapi.com',
                'x-rapidapi-key': os.getenv("RAPID_API_KEY")
                }
    
        r = requests.get('https://instagram-scraper-api2.p.rapidapi.com/v1/comments', params=params, headers=headers)
        
        if r.status_code == 404:
            raise HTTPException(status_code=500, detail="Comentários não localizado")
        if r.status_code == 403:
            continue
        
        r.raise_for_status()    
        data = r.json()
        
        if data.get('data',{}).get('items', []) is None:
            continue
        
        raw_comments = data.get('data',{}).get('items', [])
        
        if len(raw_comments) > 10:
            raw_comments = raw_comments[:10]
        
        for raw_comment in raw_comments:
            
            comment_txt = ''
            
            if raw_comment.get('type','') != 2:
                
                comment_txt = clean_comment_text(raw_comment.get('text',''))
                
                if comment_txt != '':
                    comment = {
                        'id' : raw_comment.get('id',''),
                        'at_insta' : raw_comment.get('created_at',''),
                        'comment_text' : comment_txt,
                        'classification' : '',
                        'post_id' : id
                    }

                    comments.append(comment)
                
    return comments

@app.get("/fetch/{username}")
def fetch_and_store(username: str):
        
    #profile, posts = fetch_profile_posts(username)        
    
    print('--------------------------------------')

    #comments = fetch_comments(posts)

    print('--------------------------------------')

    
    if save_to_database(profile, posts, comments):
        return {"profile": profile, "posts": posts, "comments" : comments}

    
    #return  {"status": "success", "message": f"Dados do perfil {username} foram salvos."}

