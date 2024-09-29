import re
import os
import psycopg2

def clean_comment_text(comment):
    """Função que dos comentários espaços extras, espaços duplos, emojis, números, caractéres epeciais e passa o texto para lower

    Args:
        comment (text): comentário a ser tratado.

    Returns:
        text: comentário com os devidos tratamentos.
    """
    comment = comment.strip()
    
    comment = comment.lower()
    
    comment = re.sub(r'http\S+|www\S+|https\S+', '', comment, flags=re.MULTILINE)
    comment = re.sub(r'\d+', '', comment)
    comment = re.sub(r'[^\w\s]', '', comment) 
    
    comment = re.sub(r'\s+', ' ', comment)
    
    return comment


def get_db_connection():
    """Função que retorna a conexão com o banco de dados

    Returns:
        connection: Conexão com o DB
    """
    return psycopg2.connect(
        dbname='bd',
        user='user',
        password='password',
        host='127.0.0.1',
        port=5434
    )