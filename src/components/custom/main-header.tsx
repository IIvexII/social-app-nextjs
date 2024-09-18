import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function MainHeader() {
  return (
    <header className='flex flex-row justify-between items-center py-4'>
      <Image src={Logo} alt='Logo' width={70} height={70} />
      <div className='flex flex-row gap-10 items-center text-xl'>
        <Link href='/'>Feed</Link>
        <Link href='/new'>
          <Button>New Post</Button>
        </Link>
      </div>
    </header>
  );
}
