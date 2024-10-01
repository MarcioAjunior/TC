import React from 'react';
import Link from 'next/link';

interface CardProps {
    id : string;
    username: string;
    user_fullname: string;
    user_picture: string;
  }

const Card: React.FC<CardProps> = ({id,  username, user_fullname, user_picture }) => {
    return (
        <Link href={`/posts_user/${id}`} passHref>
          <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-[#f0a818] transition-transform hover:scale-105">
            <img src={`/api/image-proxy?url=${encodeURIComponent(user_picture)}`} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-[#181848]">{username}</h2>
              <p className="text-gray-800 text-sm">{user_fullname}</p>
            </div>
          </div>
        </Link>
      );
};

export default Card;
