import { createPost } from '@/actions/posts';
import NewPostForm from '@/components/custom/form/create-post-form';

export default function CreatePost() {
  return <NewPostForm action={createPost} />;
}
