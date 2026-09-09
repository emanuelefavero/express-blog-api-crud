import { index } from './errorsController.js';

export const registerErrors = (app) => {
  app.route('/errors').get(index);
};
