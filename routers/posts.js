import { create, destroy, index, show, update } from '#/controllers/posts.js';

export const registerPosts = (app) => {
  app.route('/posts').get(index).post(create);
  app.route('/posts/:id').get(show).put(update).delete(destroy);
};
