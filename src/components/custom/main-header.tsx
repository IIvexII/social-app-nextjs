import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function MainHeader() {
  return (
    <header className='flex flex-row justify-between items-center py-4'>
      <Image
        src={Logo}
        alt='Mobile phone with post feed on it'
        priority
        className='w-16 h-16'
      />
      <div className='flex flex-row gap-10 items-center text-xl'>
        <Link
          href='/'
          className='hover:text-pink-400 transition-all duration-200'
        >
          Feed
        </Link>
        <Link href='/new'>
          <Button variant={'pinkish'}>New Post</Button>
        </Link>
      </div>
    </header>
  );
}
