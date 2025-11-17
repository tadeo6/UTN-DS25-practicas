import prisma from "../config/prisma";

export async function createPost(data: any) {
  // Validar que el usuario existe
  const user = await prisma.user.findUnique({
    where: { id: data.authorId },
  });

  if (!user) {
    const err: any = new Error("Author not found");
    err.statusCode = 404;
    throw err;
  }

  return await prisma.post.create({
    data,
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: { author: true },
  });
}

export async function getPostById(id: number) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!post) {
    const err: any = new Error("Post not found");
    err.statusCode = 404;
    throw err;
  }

  return post;
}

export async function getPostsByUser(userId: number) {
  return await prisma.post.findMany({
    where: { authorId: userId },
    include: { author: true },
  });
}
