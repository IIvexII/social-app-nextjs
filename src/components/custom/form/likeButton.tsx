import { Heart } from 'lucide-react';

export default function LikeButton({ liked = false }) {
  const heartClassName = liked
    ? 'fill-pink-600 hover:scale-125'
    : 'fill-transparent hover:scale-125';
  return (
    <div className='px-6 py-6'>
      <button type='submit'>
        <Heart
          className={`stroke-pink-600 transition-all duration-300 ${heartClassName}`}
        />
        {''}
      </button>
    </div>
  );
}
