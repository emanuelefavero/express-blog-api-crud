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
  const postData = req.body;
  const createdPost = Post.create(postData);
  res.status(201).location(`/posts/${createdPost.id}`).json(createdPost);
};

export const update = (req, res) => {
  const { id } = req.params;
  const postData = req.body;
  res.json({ message: `Aggiornamento di post: ${id}`, postData });
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
