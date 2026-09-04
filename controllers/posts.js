import { Post } from '#/repositories/posts.js';
import { validatePostId, validatePostQuery } from '#/validation/posts.js';

export const index = (req, res) => {
  const { tag, search, sortBy, order, _limit } = req.query;

  const validationError = validatePostQuery({
    tag,
    search,
    sortBy,
    order,
    _limit,
  });

  if (validationError)
    return res.status(400).json({ message: validationError });

  const posts = Post.findAll({
    tag,
    search,
    sortBy,
    order,
    _limit: _limit ? Number(_limit) : undefined,
  });

  return res.json(posts);
};

export const show = (req, res) => {
  const id = Number(req.params.id);

  const idValidationError = validatePostId(id);

  if (idValidationError)
    return res.status(400).json({ message: idValidationError });

  const post = Post.findById(id);

  if (!post) return res.status(404).json({ message: 'Post non trovato' });

  return res.json(post);
};

export const create = (req, res) => {
  res.send('TODO: Creazione di un nuovo post');
};

export const update = (req, res) => {
  const { id } = req.params;
  res.send(`TODO: Aggiornamento del post con id: ${id}`);
};

export const destroy = (req, res) => {
  const { id } = req.params;
  res.send(`TODO: Eliminazione del post con id: ${id}`);
};
