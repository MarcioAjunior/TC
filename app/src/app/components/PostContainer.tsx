import React from 'react';
import PostCard from './PostCard';

type Posts = {
  id : string;
  at_insta : string;
  post_url : string;
  thumb_url : string;
  post_text : string;
  user_id : string;
}

type Post = {
  id : string;
  at_insta : string;
  post_url : string;
  thumb_url : string;
  post_text : string;
  user_id : string;
}

const PostContainer: React.FC<PostContainerProps> = ({posts}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-20">
      {
      posts.map((post : Posts) => (
        <PostCard
          key={post.id}
          id={post.id}
          at_insta={post.at_insta}
          post_url={post.post_url}
          thumb_url={post.thumb_url}
          post_text={post.post_text}
        />
      ))
      
      }
    </div>
  );
};

export default PostContainer;
