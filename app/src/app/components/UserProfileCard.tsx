import React from 'react';

interface UserProfileCardProps {
  id : string
  username: string;
  fullName: string;
  profileImageUrl: string;
  postCount: number;
  commentCount: number;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  id,
  username,
  fullName,
  profileImageUrl,
  postCount,
  commentCount,
}) => {
  console.log(profileImageUrl)
  return (
    <div className="bg-[#181848] text-white p-4 rounded-lg shadow-lg flex items-center w-full border-b-4 border-[#f0a818]"> 
      <img
        src={`/api/image-proxy?url=${encodeURIComponent(profileImageUrl)}`}
        alt={`${username}'s profile`}
        className="w-32 h-32 rounded-full object-cover mr-12"
      />
      <div className="flex flex-col justify-between">
        <h2 className="text-[#f0a818] font-bold text-xl mb-2">{username}</h2>
        <p className="text-[#7890a8]">{fullName}</p>
        <div className="mt-4 flex space-x-4">
          <div>
            <p className="text-[#f0a818] font-bold">{postCount}</p>
            <p>Posts</p>
          </div>
          <div>
            <p className="text-[#f0a818] font-bold">{commentCount}</p>
            <p>Comentários</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
