import { readJsonFile, writeJsonFile } from '#/utils/json.js';

// REPOSITORY
export const init = (postsFilePath) => {
  const readPosts = () => readJsonFile(postsFilePath);

  const count = () => {
    return readPosts().length;
  };

  const findAll = ({ tag, search, sortBy, order = 'asc', _limit } = {}) => {
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
      posts = posts.slice(0, Number(_limit));
    }

    return posts;
  };

  const findById = (id) => {
    const posts = readPosts();

    return posts.find((post) => post.id === id);
  };

  const create = (postData) => {
    const posts = readPosts();

    const ids = posts.map((post) => post.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;

    const newPost = {
      id: maxId + 1,
      ...postData,
    };

    const updatedPosts = [...posts, newPost];

    writeJsonFile(postsFilePath, updatedPosts);

    return newPost;
  };

  const update = (id, postData) => {
    const posts = readPosts();
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) return null;

    const updatedPost = { id, ...postData };
    posts[postIndex] = updatedPost;

    writeJsonFile(postsFilePath, posts);

    return updatedPost;
  };

  const destroy = (id) => {
    const posts = readPosts();
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) return null;

    const [destroyedPost] = posts.splice(postIndex, 1);

    writeJsonFile(postsFilePath, posts);

    return destroyedPost;
  };

  return { count, findAll, findById, create, update, destroy };
};
