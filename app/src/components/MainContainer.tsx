// src/components/NewsContainer.tsx
import React from 'react';
import Card from './Card';
import { link } from 'fs';

const MainContainer: React.FC = () => {
  const newsItems = [
    {
        title: 'Notícia 1',
        description: 'Descrição da notícia 1.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      {
        title: 'Notícia 2',
        description: 'Descrição da notícia 2.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      {
        title: 'Notícia 3',
        description: 'Descrição da notícia 3.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      {
        title: 'Notícia 4',
        description: 'Descrição da notícia 4.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      {
        title: 'Notícia 5',
        description: 'Descrição da notícia 5.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      {
        title: 'Notícia 6',
        description: 'Descrição da notícia 6.',
        imageUrl: 'https://via.placeholder.com/300',
      },
      
  ];

  return (
    <div className="container mx-auto p-12 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {newsItems.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} imageUrl={item.imageUrl} link='' />
      ))}
    </div>
  );
};

export default MainContainer;
