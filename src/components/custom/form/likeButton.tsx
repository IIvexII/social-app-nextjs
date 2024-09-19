import { Heart } from 'lucide-react';

export default function LikeButton({ liked = false }) {
  const heartClassName = liked
    ? 'fill-red-500 hover:scale-125'
    : 'fill-transparent hover:scale-125';
  return (
    <div className='px-6 py-6'>
      <button type='submit'>
        <Heart
          className={`stroke-red-500 transition-all duration-300 ${heartClassName}`}
        />
        {''}
      </button>
    </div>
  );
}
