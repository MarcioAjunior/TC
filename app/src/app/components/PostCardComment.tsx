import React from 'react';

const PostCardComment: React.FC<PostCardCommentProps> = ({ id, post_url, post_text, at_insta, thumb_url }) => {
  const date = new Date(Number(at_insta) * 1000);
  const formattedDate = date.toLocaleString('pt-BR',{ 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  } );
  return (
    <div className="relative bg-[#100e06] text-white rounded-lg shadow-lg overflow-hidden w-full h-[50vh] flex border-b-4 border-[#f0a818] mb-12"> {/* Atualizado mb-12 */}
      <div className="w-3/10 h-full">
        <img
          src={`/api/image-proxy?url=${encodeURIComponent(thumb_url || '')}`}
          alt="Post Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-px bg-[#f0a818] h-full"></div>
      <div className="w-7/10 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-[#f0a818] text-xl mb-4">Post publicado em: {formattedDate}.</h2>
          <p className="text-white mb-4">{post_text}</p>
        </div>
        <div>
          <a href={post_url} className="text-[#f0a818] underline" target="_blank" rel="noopener noreferrer">
            Ver post original
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCardComment;
