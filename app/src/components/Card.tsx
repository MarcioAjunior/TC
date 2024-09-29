// src/components/Card.tsx
import React from 'react';
import Link from 'next/link';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string; 
  }

const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
    return (
        <Link href={link} passHref>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-[#f0a818] transition-transform hover:scale-105">
            <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-[#181848]">{title}</h2>
              <p className="text-gray-800 text-sm">{description}</p>
            </div>
          </div>
        </Link>
      );
};

export default Card;
