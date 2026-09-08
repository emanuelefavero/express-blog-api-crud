import { init as initController } from './postsController.js';

export const registerPosts = (app, postsRepository) => {
  const controller = initController(postsRepository);

  app.route('/posts').get(controller.index).post(controller.store);

  app
    .route('/posts/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.destroy);
};
