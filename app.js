import path from 'node:path';
import express from 'express';
import { registerPosts } from '#/routes/posts.js';
import { registerRoot } from '#/routes/root.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.static(path.join(import.meta.dirname, 'public')));
registerPosts(app);
registerRoot(app);
app.use((_, res) => res.status(404).json({ message: 'Not Found' })); // 404

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
