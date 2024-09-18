import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreatePost() {
  return (
    <div className='max-w-screen-sm shadow-lg bg-white/5 backdrop-blur-lg px-16 py-8 rounded-2xl mx-auto'>
      <form className='flex flex-col gap-6'>
        <h1 className='text-3xl font-bold mb-4'>Create new post</h1>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' name='title' type='text' placeholder='Title' />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='image'>Image</Label>
          <Input id='image' name='image' type='file' placeholder='image' />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='Content'>Content</Label>
          <Textarea
            id='content'
            name='content'
            placeholder='Content'
            rows={4}
          />
        </div>
        <div className='mt-4 flex flex-row gap-4 justify-end'>
          <Button type='submit' variant={'secondary'}>
            Reset
          </Button>
          <Button type='submit'>Create Post</Button>
        </div>
      </form>
    </div>
  );
}
