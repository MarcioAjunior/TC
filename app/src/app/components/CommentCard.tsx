import React from 'react';

const CommentCard: React.FC<CommentCardProps> = ({ id, at_insta, comment_text, classification }) => {
  const date = new Date(Number(at_insta) * 1000);
  const formattedDate = date.toLocaleString('pt-BR',{ 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  } );

  return (
    <div className="relative bg-[#181848] text-[#E0E0E0] rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{formattedDate}.</span>
        <span className={`text-sm font-semibold ${classification === 'BOM' ? 'text-green-500' : classification === 'NEUTRO' ? 'text-yellow-500' : 'text-red-500'}`}>
          {classification}
        </span>
      </div>
      <p className="text-base">{comment_text}</p>
    </div>
  );
};

export default CommentCard;
