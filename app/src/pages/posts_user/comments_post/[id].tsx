'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../../app/globals.css';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import PostCardComment from '@/app/components/PostCardComment';
import CommentCard from '@/app/components/CommentCard';

import { fetchPost } from '@/repository/lb_posts';
import Head from 'next/head';


const CommentsPage: React.FC = () => {
  
  const [post, setPost] = useState<Posts | null>(null);
  const [postId, setpostId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      console.log()
      if (typeof id === 'string') {
        setpostId(id);
      }
    }

    
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (typeof postId === 'string') {
      fetchPost(postId).then((data) => {

      let ppost = {
        id :  data.id,
        at_insta : data.at_insta,
        post_url : data.post_url,
        thumb_url : data.thumb_url,
        post_text : data.post_text,
        user_id : data.user_id,
        comments : data.comments
      }

      setPost(ppost)

      })
    }
  }, [postId]); 
  
  return (
<>
  <Head>
    <title>Dashboar APP</title>
    <meta name="description" content="Description for Example Page" />
  </Head>
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow flex flex-col items-center justify-start p-6 m-12 mt-8">
      
      <div className="w-full flex justify-start mb-1">
        <button
          onClick={() => router.back()}
          className="flex items-center bg-[#f0a818] text-black py-2 px-4 rounded-lg shadow-md hover:bg-[#7890a8] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>

      <h1 className="text-white text-2xl mb-8">Comentários do Post {post?.post_text}</h1>

      <div className="w-full space-y-8">
        <PostCardComment
          key={post?.id}
          id={post?.id}
          at_insta={post?.at_insta}
          post_url={post?.post_url}
          thumb_url={post?.thumb_url}
          post_text={post?.post_text}
        />

        {post?.comments?.map((comment) => (
          <CommentCard
            id={comment.id}
            key={comment.id}
            at_insta={comment.at_insta}
            comment_text={comment.comment_text}
            classification={comment.classification}
          />
        ))}
      </div>
    </main>
    <Footer />
  </div>
</>

  );
};

export default CommentsPage;