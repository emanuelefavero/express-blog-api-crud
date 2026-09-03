import { Post } from './posts.js';

const postsEndpoints = [
  {
    method: 'GET',
    path: '/posts',
    description: 'Recupera tutti i post',
  },
  {
    method: 'GET',
    path: '/posts/:id',
    description: 'Recupera un singolo post',
  },
  {
    method: 'POST',
    path: '/posts',
    description: 'Crea un nuovo post',
  },
  {
    method: 'PUT',
    path: '/posts/:id',
    description: 'Aggiorna un post',
  },
  {
    method: 'DELETE',
    path: '/posts/:id',
    description: 'Elimina un post',
  },
];

export const Root = {
  getOverview() {
    return {
      message: 'Welcome to the Express Blog API',
      apiEndpoints: {
        posts: {
          totalCount: Post.count(),
          endpoints: postsEndpoints,
        },
      },
    };
  },
};
