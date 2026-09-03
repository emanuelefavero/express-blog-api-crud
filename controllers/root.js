import { Root } from '#/data/root.js';

export const index = (req, res) => {
  return res.json(Root.getOverview());
};
