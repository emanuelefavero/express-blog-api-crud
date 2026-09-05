import { Post } from '#/repositories/posts.js';
import { validatePostId, validatePostQuery } from '#/validation/posts.js';

export const index = (req, res) => {
  const validationError = validatePostQuery(req.query);

  if (validationError)
    return res.status(400).json({ message: validationError });

  const posts = Post.findAll(req.query);

  return res.json(posts);
};

export const show = (req, res) => {
  const id = Number(req.params.id);

  const validationError = validatePostId(id);

  if (validationError)
    return res.status(400).json({ message: validationError });

  const post = Post.findById(id);

  if (!post) return res.status(404).json({ message: 'Post non trovato' });

  return res.json(post);
};

export const store = (req, res) => {
  const body = req.body;
  const post = Post.create(body);
  res.status(201).location(`/posts/${post.id}`).json(post);
};

export const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({ message: `Aggiornamento di post: ${id}`, body });
};

export const destroy = (req, res) => {
  const id = Number(req.params.id);

  const validationError = validatePostId(id);

  if (validationError)
    return res.status(400).json({ message: validationError });

  const destroyedPost = Post.destroy(id);

  if (!destroyedPost)
    return res.status(404).json({ message: 'Post non trovato' });

  return res.sendStatus(204);
};
