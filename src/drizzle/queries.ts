import { db } from '@/drizzle/db';
import { likes, posts, users } from '@/drizzle/schema';
import { and, count, desc, eq } from 'drizzle-orm';

export async function getAllPostsWithLikes() {
  const user = await db.select().from(users).where(eq(users.email, 'contact@zafeer.pk'));

  if (user.length === 0 || user[0].id === undefined) {
    return [];
  }

  const userId = user[0].id;

  const allPosts = await db
    .select({
      userId: users.id,
      username: users.firstName,
      isLiked: count(likes.id),
      id: posts.id,
      title: posts.title,
      content: posts.content,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .innerJoin(users, eq(posts.userId, users.id))
    .leftJoin(likes, and(eq(likes.postId, posts.id), eq(likes.userId, userId)))
    .groupBy(posts.id, users.firstName, users.id);

  const modifiedPosts = allPosts.map((post) => {
    return {
      ...post,
      isLiked: post.isLiked > 0,
    };
  });

  return modifiedPosts;
}

export async function addLike(postId: string) {
  const user = await db.select().from(users).where(eq(users.email, 'contact@zafeer.pk'));

  if (user.length === 0 || user[0].id === undefined) {
    return;
  }
  const userId = user[0].id;

  const liked = await db
    .select()
    .from(likes)
    .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));

  if (liked.length > 0) {
    // delete the like
    await db
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
  } else {
    await db.insert(likes).values({ postId, userId });
  }
}
