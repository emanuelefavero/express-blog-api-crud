import {
  postBodySchema,
  postParamsSchema,
  postQuerySchema,
} from './postsSchemas.js';

const sendValidationError = (res, error) =>
  res.status(400).json({ message: error.issues[0].message });

// CONTROLLERS
export const init = (postsRepository) => {
  const index = (req, res) => {
    const result = postQuerySchema.safeParse(req.query);

    if (!result.success) return sendValidationError(res, result.error);

    const posts = postsRepository.findAll(result.data);

    return res.json(posts);
  };

  const show = (req, res) => {
    const result = postParamsSchema.safeParse(req.params);

    if (!result.success) return sendValidationError(res, result.error);

    const { id } = result.data;

    const post = postsRepository.findById(id);

    if (!post) return res.status(404).json({ message: 'Post non trovato' });

    return res.json(post);
  };

  const store = (req, res) => {
    const result = postBodySchema.safeParse(req.body);

    if (!result.success) return sendValidationError(res, result.error);

    const createdPost = postsRepository.create(result.data);

    return res
      .status(201)
      .location(`/posts/${createdPost.id}`)
      .json(createdPost);
  };

  const update = (req, res) => {
    const paramsResult = postParamsSchema.safeParse(req.params);

    if (!paramsResult.success)
      return sendValidationError(res, paramsResult.error);

    const bodyResult = postBodySchema.safeParse(req.body);

    if (!bodyResult.success) return sendValidationError(res, bodyResult.error);

    const { id } = paramsResult.data;

    const updatedPost = postsRepository.update(id, bodyResult.data);

    if (!updatedPost)
      return res.status(404).json({ message: 'Post non trovato' });

    return res.json(updatedPost);
  };

  const destroy = (req, res) => {
    const result = postParamsSchema.safeParse(req.params);

    if (!result.success) return sendValidationError(res, result.error);

    const { id } = result.data;

    const destroyedPost = postsRepository.destroy(id);

    if (!destroyedPost)
      return res.status(404).json({ message: 'Post non trovato' });

    return res.sendStatus(204);
  };

  return { index, show, store, update, destroy };
};
