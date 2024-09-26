from fastapi import FastAPI
from utils.db import save_to_database
from utils import fetch_profile_posts, fetch_comments

app = FastAPI()

@app.get("/fetch/{username}")
def fetch_and_store(username: str):
            
    profile, posts = fetch_profile_posts(username)        
    
    comments = fetch_comments(posts)
    
    if save_to_database(profile, posts, comments):
        return  {"status": "success", "message": f"Dados do perfil {username} foram salvos com sucesso."}
        
    
    

