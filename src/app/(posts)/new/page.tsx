import ImagePicker from '@/components/custom/form/image-picker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/actions/posts';
import { SubmitButton } from '@/components/custom/form/submit-form-btn';

export default function CreatePost() {
  return (
    <form
      action={createPost}
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

        <Textarea
          className='h-full py-2 text-lg'
          id='content'
          name='content'
          placeholder='Content'
          rows={4}
        />
        <div className='flex flex-row justify-between items-end'>
          <ImagePicker />
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
