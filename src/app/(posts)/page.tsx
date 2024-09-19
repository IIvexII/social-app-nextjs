import { PostList } from '@/components/custom/postList';
import { getAllPostsWithLikes } from '@/drizzle/queries';

export default async function Home() {
  const posts = await getAllPostsWithLikes();

  return (
    <div className='bg-white/5 p-12 rounded-xl mt-8'>
      <h2 className='text-2xl text-center font-semibold tracking-wide mb-10'>
        All Posts by all users
      </h2>
      <PostList posts={posts} />
    </div>
  );
}
