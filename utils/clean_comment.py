import emoji
import re

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