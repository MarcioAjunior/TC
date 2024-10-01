export const fetchPost = async (id:any) => {
    try {
      const response = await fetch(`/api/lb_posts/${id}`);
      const data = await response.json();
      return data
    } catch (error) {
        console.error('Erro ao buscar postagem:', error);
        return {}
    }
  };
  