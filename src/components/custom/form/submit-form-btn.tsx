'use client';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button type='submit' disabled>
        <LoaderCircle className='mr-2 h-4 w-4 animate-spin duration-200' />
        Creating Post
      </Button>
    );
  } else {
    return <Button type='submit'>Create Post</Button>;
  }
}
