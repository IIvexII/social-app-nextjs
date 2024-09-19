'use client';

import ImagePicker from '@/components/custom/form/image-picker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/custom/form/submit-form-btn';
import { useFormState } from 'react-dom';

interface ActionProps {
  action: (
    prevFormState: {
      title: string;
      content: string;
      image: string;
    },
    formData: FormData
  ) => Promise<{ title: string; content: string; image: string }>;
}

export default function NewPostForm({ action }: ActionProps) {
  const [state, formAction] = useFormState(action, {
    title: '',
    content: '',
    image: '',
  });

  return (
    <form
      action={formAction}
      className='max-w-[520px] shadow-lg bg-white/5 backdrop-blur-lg px-16 py-12 rounded-2xl mx-auto'
    >
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl text-gray-200 font-bold mb-2 text-center'>
          Create new post
        </h1>
        <Input
          className='h-full py-2 text-lg'
          id='title'
          name='title'
          type='text'
          placeholder='Title'
        />
        {state.title && <p className='-mt-4 text-red-500'>{state.title}</p>}

        <Textarea
          className='h-full py-2 text-lg'
          id='content'
          name='content'
          placeholder='Content'
          rows={4}
        />
        {state.content && <p className='-mt-4 text-red-500'>{state.content}</p>}
        <div className='flex flex-row justify-between items-end'>
          <ImagePicker />
          <SubmitButton />
        </div>
        {state.image && <p className='-mt-4 text-red-500'>{state.image}</p>}
      </div>
    </form>
  );
}
