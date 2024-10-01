'use client'
import React from 'react';
import Card from './Card';
import { useState, useEffect } from 'react';
import { fetchUsers } from '@/repository/lb_users'
import { useLoadingContext } from '../LoadingContext';




const MainContainer: React.FC = () => {
  const { loading, setLoading, needReload, setNeedReload } = useLoadingContext();
  
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data : any) => {
        return setUsers(data)
      })
  }, []); 
  
  useEffect(() => {
    if (needReload) {
      fetchUsers().then((data : any) => {
        return setUsers(data)
      })
      setNeedReload(false)
    }
  }, [needReload]);  

  
  return (
    <div className="container mx-auto p-12 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
     
     {loading && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-[#f0a818] transition-transform hover:scale-105 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f0a818]"></div>
        </div>
      )}
      
      {
        users && users.length > 0 ? (
          users.map((item) => (
            <Card 
              key={item.id} 
              id={item.id} 
              username={item.username} 
              user_fullname={item.user_fullname} 
              user_picture={item.user_picture} 
            />
          ))
        ) : (
          <p>Carregando usuários...</p>
        )
      }
    </div>
  );
};

export default MainContainer;
