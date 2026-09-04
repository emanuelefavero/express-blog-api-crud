import { Root } from '#/repositories/root.js';

export const index = (req, res) => res.json(Root.getOverview());
