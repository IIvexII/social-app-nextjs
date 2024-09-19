import Image from 'next/image';
import { Card } from '../ui/card';
import { Heart } from 'lucide-react';

interface PostProps {
  post: {
    imageUrl: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      firstName: string | null;
    } | null;
  };
}

export function Post({ post }: PostProps) {
  console.log(post);
  return (
    <Card className='flex flex-row gap-8'>
      <div className='rounded-s-lg max-w-32 w-full flex justify-center items-center'>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={70}
          height={70}
          className='!relative object-cover rounded-lg'
        />
      </div>
      <div className='py-4 flex flex-col gap-3 grow'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-xl font-semibold'>{post.title}</h2>
          <p className='text-gray-400 '>
            Shared by {post.user?.firstName} at{' '}
            {post.createdAt.toLocaleString()}
          </p>
        </div>

        <p className='text-gray-300 hyphens-auto'>{post.content}</p>
      </div>
      <div className='px-6 py-6'>
        <Heart />
      </div>
    </Card>
  );
}
