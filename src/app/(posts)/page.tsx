import { Post } from '@/components/custom/post';
import { db } from '@/drizzle/db';
import { posts } from '@/drizzle/schema';
import { asc, desc } from 'drizzle-orm';

export default async function Home() {
  const allPosts = await db.query.posts.findMany({
    with: {
      user: {
        columns: {
          firstName: true,
        },
      },
    },
    orderBy: [desc(posts.createdAt)],
  });

  if (allPosts.length === 0) {
    return (
      <div className='bg-white/5 p-4 rounded-xl'>
        <h2 className='text-2xl text-center font-semibold tracking-wide'>
          No posts found
        </h2>
      </div>
    );
  }

  return (
    <div className='bg-white/5 p-12 rounded-xl mt-8'>
      <h2 className='text-2xl text-center font-semibold tracking-wide mb-10'>
        All Posts by all users
      </h2>
      <div className='flex flex-col gap-6'>
        {allPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
