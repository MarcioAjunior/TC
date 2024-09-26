import requests
import time
from utils.perfiis_utilizados_para_treino import NOMES

BASE_URL = 'http://127.0.0.1:8000/fetch/'

def requester(param):
    try:
        url = BASE_URL + param
        response = requests.get(url)
        if response.status_code == 200:
            print(f'Sucesso: {param}')
        else:
            print(f'Erro {response.status_code}: {param}')
    except requests.exceptions.RequestException as e:
        print(f'Erro na requisição: {e}')

if __name__ == '__main__':    
    for nome in NOMES:
        requester(nome)
        time.sleep(1)
