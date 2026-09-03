import { index } from '#/controllers/root.js';

export const registerRoot = (app) => {
  app.get('/', index);
};
