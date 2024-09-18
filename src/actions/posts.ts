'use server';

export async function createPost(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const image = formData.get('image') as File;

  console.log({ title, content, image });
}
