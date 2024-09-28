import pickle
import os
from .rapidapi import fetch_comments, fetch_profile_posts 

from .db import get_db_connection, save_to_database
from .clean_comment import clean_comment_text

# model_path = os.path.join(os.path.dirname(__file__), 'best_model.pkl')
# with open(model_path, 'rb') as file:
#     my_model = pickle.load(file)
    
    
