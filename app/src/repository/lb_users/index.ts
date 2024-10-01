export const fetchUsers = async () => {
    try {
      const response = await fetch('/api/lb_users');
      const data = await response.json();
      return data
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return []
    }
  };

export const fetchUser = async (id:any) => {
  
  try {
    const response = await fetch(`/api/lb_users/${id}`);
    const data = await response.json();
    return data
  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return {}
  }
};
