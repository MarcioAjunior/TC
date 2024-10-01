export const fetchprofile = async (username:any) => {
    try {
      let url = `http://localhost:8000/fetch/${username}`
      
      const response = await fetch(url);
      console.log(response)
      const data = await response.json();
      return data
    } catch (error) {
        console.error('Erro procurar pelo profile', error);
        return {"status": "failed", "message": `não foi possível encontrar postagens do perfil ${username}`}
    }
  };
  