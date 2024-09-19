'use client';

import { likePost } from '@/actions/posts';
import { Post } from '@/components/custom/post';
import { useOptimistic } from 'react';

interface Post {
  id: any;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
  username: string | null;
  isLiked: boolean;
}

interface PostProps {
  posts: Post[];
}

export function PostList({ posts }: PostProps) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts: Post[], updatedPostId: string) => {
      const post = prevPosts.findIndex((post) => post.id === updatedPostId);

      if (post === -1) {
        return prevPosts;
      }

      const updatedPosts = [...prevPosts];
      updatedPosts[post] = {
        ...updatedPosts[post],
        isLiked: !updatedPosts[post].isLiked,
      };

      return updatedPosts;
    }
  );

  async function updatePost(postId: string) {
    updateOptimisticPosts(postId);
    await likePost(postId);
  }

  return (
    <div className='flex flex-col gap-6'>
      {optimisticPosts.map((post: Post) => (
        <Post key={post.id} post={post} action={updatePost} />
      ))}
    </div>
  );
}
