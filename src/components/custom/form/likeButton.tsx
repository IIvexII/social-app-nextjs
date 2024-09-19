import { Heart } from 'lucide-react';

export default function LikeButton({ liked = false }) {
  const heartClassName = liked
    ? 'fill-red-500 hover:fill-transparent'
    : 'fill-transparent hover:fill-red-500';
  return (
    <form className='px-6 py-6'>
      <button type='submit'>
        <Heart
          className={`stroke-red-500 transition-all duration-300 ${heartClassName}`}
        />
        {''}
      </button>
    </form>
  );
}
