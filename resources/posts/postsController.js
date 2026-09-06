import { Post } from './postsRepository.js';
import {
  normalizePostData,
  validatePostData,
  validatePostId,
  validatePostQuery,
} from './postsValidation.js';

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
  const validationError = validatePostData(body);

  if (validationError)
    return res.status(400).json({ message: validationError });

  const postData = normalizePostData(body);

  const createdPost = Post.create(postData);

  return res.status(201).location(`/posts/${createdPost.id}`).json(createdPost);
};

export const update = (req, res) => {
  const id = Number(req.params.id);

  const idValidationError = validatePostId(id);

  if (idValidationError)
    return res.status(400).json({ message: idValidationError });

  const body = req.body;
  const dataValidationError = validatePostData(body);

  if (dataValidationError)
    return res.status(400).json({ message: dataValidationError });

  const postData = normalizePostData(body);

  const updatedPost = Post.update(id, postData);

  if (!updatedPost)
    return res.status(404).json({ message: 'Post non trovato' });

  return res.json(updatedPost);
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
