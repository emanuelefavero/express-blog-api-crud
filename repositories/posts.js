import path from 'node:path';
import { readJsonFile } from '#/utils/json.js';

const postsFilePath = path.join(import.meta.dirname, '../data/posts.json');

const readPosts = () => readJsonFile(postsFilePath);

export const Post = {
  count() {
    return readPosts().length;
  },

  findAll({ tag, search, sortBy, order = 'asc', _limit } = {}) {
    let posts = readPosts();

    if (tag) {
      posts = posts.filter((post) =>
        post.tags.some(
          (postTag) => postTag.toLowerCase() === tag.toLowerCase(),
        ),
      );
    }

    if (search) {
      const normalizedSearch = search.toLowerCase();

      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalizedSearch) ||
          post.content.toLowerCase().includes(normalizedSearch),
      );
    }

    if (sortBy === 'id') {
      posts = posts.toSorted((firstPost, secondPost) => {
        return order === 'asc'
          ? firstPost.id - secondPost.id
          : secondPost.id - firstPost.id;
      });
    }

    if (sortBy === 'title') {
      posts = posts.toSorted((firstPost, secondPost) => {
        return order === 'asc'
          ? firstPost.title.localeCompare(secondPost.title)
          : secondPost.title.localeCompare(firstPost.title);
      });
    }

    if (_limit) {
      posts = posts.slice(0, _limit);
    }

    return posts;
  },

  findById(id) {
    const posts = readPosts();

    return posts.find((post) => post.id === id);
  },
};
