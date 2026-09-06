import { Root } from './rootRepository.js';

export const index = (req, res) => res.json(Root.getOverview());
