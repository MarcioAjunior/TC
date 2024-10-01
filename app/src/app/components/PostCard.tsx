import React from 'react';
import Link from 'next/link';

const PostCard: React.FC<PostCardProps> = ({ id, at_insta, post_url, thumb_url, post_text }) => {
  return (
    <Link href={`/posts_user/comments_post/${id}`} passHref>
      <div className="relative bg-[#181848] text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-95 h-96"> {/* Aqui usamos h-96 */}
        <img
          src={`/api/image-proxy?url=${encodeURIComponent(thumb_url)}`}
          alt="Post"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-[#00000080] p-4">
          <p className="text-[#f0a818]">{post_text}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
