import { Post } from '@/components/custom/post';
import { db } from '@/drizzle/db';

export default async function Home() {
  const posts = await db.query.posts.findMany({
    with: {
      user: {
        columns: {
          firstName: true,
        },
      },
    },
  });

  console.log(posts);

  if (posts.length === 0) {
    return (
      <div className='bg-white/5 p-4 rounded-xl'>
        <h2 className='text-2xl text-center font-semibold tracking-wide'>
          No posts found
        </h2>
      </div>
    );
  }

  return (
    <div className='bg-white/5 px-12 py-6 rounded-xl mt-8'>
      <h2 className='text-2xl text-center font-semibold tracking-wide mb-10'>
        All Posts by all users
      </h2>
      <div className='flex flex-col gap-6'>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
