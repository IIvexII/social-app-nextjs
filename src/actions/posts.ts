'use server';

import sharp from 'sharp';
import { UTApi } from 'uploadthing/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuid4 } from 'uuid';

import { formSchema } from '@/validations/new-post-form';
import { db } from '@/drizzle/db';
import { posts, users } from '@/drizzle/schema';
import { addLike } from '@/drizzle/queries';
import { redirect } from 'next/navigation';

interface FormState {
  title: string;
  content: string;
  image: string;
}

export async function createPost(_: FormState, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const image = formData.get('image') as File;

  // validate form data using the Zod schema
  const parsedData = formSchema.safeParse({ title, content, image });

  const errors: FormState = {
    title: '',
    content: '',
    image: '',
  };

  // convert errors into simple format
  if (!parsedData.success) {
    parsedData.error.errors.forEach((error) => {
      const field = error.path[0] as keyof FormState;
      errors[field] = error.message;
    });
    return errors;
  }

  // down scale and convert the image to webp format
  let processedImageBuffer;
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    processedImageBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toBuffer();
  } catch (error) {
    errors.image =
      'Please upload a valid image in valid format like .jpg, .jpeg, .png, webp, etc.';
    return errors;
  }
  const imageName = uuid4();

  const file = new File([processedImageBuffer], `${imageName}.webp`, {
    type: 'image/webp',
  });

  // proceed with uploading the image
  let imageUrl;
  try {
    const uploadResult = await new UTApi().uploadFiles(file);
    imageUrl = uploadResult.data?.appUrl || '';
  } catch (error) {
    errors.image = 'Failed to upload image';
    return errors;
  }

  if (imageUrl === '') {
    errors.image = 'Failed to upload image';
    return errors;
  }

  // get random user from database
  const allUsers = await db.select().from(users);
  const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

  // save the post to the database
  await db.insert(posts).values({
    title,
    content,
    imageUrl,
    userId: randomUser.id,
  });

  return errors;
}

export async function likePost(postId: string) {
  await addLike(postId);

  revalidatePath('/');
  redirect('/');
}
