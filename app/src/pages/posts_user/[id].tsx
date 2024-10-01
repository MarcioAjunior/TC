'use client'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Header from '../../app/components/Header';
import Footer from '../../app/components/Footer';
import '../../app/globals.css';
import UserProfileCard from '@/app/components/UserProfileCard'
import PostContainer from '@/app/components/PostContainer';
import { fetchUser } from '@/repository/lb_users';
import Head from 'next/head';


const ProfileDetail: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (typeof id === 'string') {
        setId(id);
      }
    }
  }, [router.isReady, router.query]);

    useEffect(() => {
      if (typeof id === 'string') {
        fetchUser(id).then((data) => {    
          
          let totalComments = 0;

          if (data && Array.isArray(data.posts)) {
            for (let index = 0; index < data.posts.length; index++) {
              if (data.posts[index]._count && typeof data.posts[index]._count.comments === 'number') {
                totalComments += data.posts[index]._count.comments;
              }
            }
          }

          let profile = {
            id : data.id,
            username : data.username,
            user_fullname : data.user_fullname,
            user_picture : data.user_picture,
            is_training : data.is_training,
            updated_at : data.updated_at,
            posts : data.posts,
            count_posts : data._count.posts,
            count_comments : totalComments
          }
          return setUser(profile)
        })
      }
    }, [id]); 



    return (
      <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Description for Example Page" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-start p-6 m-12 mt-8">
        {
          user && true ? (
            <UserProfileCard
              id={user.id}
              username={user.username}
              fullName={user.user_fullname}
              profileImageUrl={user.user_picture}
              postCount= {user.count_posts} 
              commentCount={user.count_comments} 
            />
          ) : (
            <></>
          )
        }
          <div className="mt-24 w-full">
            <PostContainer posts={user?.posts || []}/>
          </div>
        </main>
        <Footer />
      </div>
    </>
    );
  };
  
  export default ProfileDetail;