import { store, destroy, index, show, update } from '#/controllers/posts.js';

export const registerPosts = (app) => {
  app.route('/posts').get(index).post(store);
  app.route('/posts/:id').get(show).put(update).delete(destroy);
};
