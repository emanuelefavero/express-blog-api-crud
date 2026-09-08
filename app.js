import path from 'node:path';
import express from 'express';
import {
  initPostsRepository,
  registerPosts,
  registerRoot,
} from '#/resources/index.js';

const PORT = process.env.PORT ?? 3000;

const postsFilePath = path.join(import.meta.dirname, 'data/posts.json');
const postsRepository = initPostsRepository(postsFilePath);

const app = express();

app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, 'public')));

registerPosts(app, postsRepository);
registerRoot(app);

app.use((req, res) =>
  res.status(404).json({ message: `Not Found: ${req.path}` }),
); // 404

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
