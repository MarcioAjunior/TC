from fastapi import FastAPI
from utils import fetch_profile_posts, fetch_comments, save_to_database
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

@app.get("/fetch/{username}")
def fetch_and_store(username: str):
    
    profile, posts = fetch_profile_posts(username)        
    
    comments = fetch_comments(posts)
    
    if save_to_database(profile, posts, comments):
        #return {'profile' : profile, 'posts' : posts, 'comments' : comments}
        return  {"status": "success", "message": f"Dados do perfil {username} foram salvos com sucesso."}
    
@app.get("/fetch_training/{username}")
def fetch_and_training(username: str):
            
    profile, posts = fetch_profile_posts(username, is_traning=True)        
    
    comments = fetch_comments(posts, is_classification=False)
    
    if save_to_database(profile, posts, comments):
        return {'profile' : profile, 'posts' : posts, 'comments' : comments}
        #return  {"status": "success", "message": f"Dados do perfil {username} foram salvos como dados para treinamento."}
        