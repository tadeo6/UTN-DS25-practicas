import * as postService from "../services/post.service";

export async function createPost(req: any, res: any) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

export async function getAllPosts(req: any, res: any) {
  const posts = await postService.getAllPosts();
  res.json(posts);
}

export async function getPostById(req: any, res: any) {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    res.json(post);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

export async function getPostsByUser(req: any, res: any) {
  const posts = await postService.getPostsByUser(Number(req.params.id));
  res.json(posts);
}
