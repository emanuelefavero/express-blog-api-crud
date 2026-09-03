const posts = [
  {
    id: 1,
    title: 'Ciambellone della domenica',
    content: 'Un ciambellone soffice e semplice, perfetto per la colazione.',
    image: '/images/ciambellone.jpeg',
    tags: ['dolci', 'colazione', 'ciambellone'],
  },
  {
    id: 2,
    title: 'Cracker rosa alla barbabietola',
    content: 'Cracker croccanti alla barbabietola, ideali per uno snack.',
    image: '/images/cracker_barbabietola.jpeg',
    tags: ['cracker', 'barbabietola', 'snack'],
  },
  {
    id: 3,
    title: 'Pane fritto dolce',
    content: 'Pane fritto dorato con una spolverata di zucchero.',
    image: '/images/pane_fritto_dolce.jpeg',
    tags: ['dolci', 'pane', 'tradizione'],
  },
  {
    id: 4,
    title: 'Pasta cremosa alla barbabietola',
    content: 'Una pasta semplice con una cremosa salsa alla barbabietola.',
    image: '/images/pasta_barbabietola.jpeg',
    tags: ['pasta', 'barbabietola', 'primi'],
  },
  {
    id: 5,
    title: 'Torta paesana della tradizione',
    content: 'La classica torta paesana, ricca e dal sapore rustico.',
    image: '/images/torta_paesana.jpeg',
    tags: ['dolci', 'torta', 'tradizione'],
  },
];

export const Post = {
  // Get posts length
  count(data = posts) {
    return data.length;
  },

  // Get all posts
  findAll(data = posts) {
    return data;
  },

  // Get post by ID
  findById(id, data = posts) {
    const parsedId = Number(id);

    return data.find((post) => post.id === parsedId);
  },

  // Filter by tag
  filterByTag(tag, data = posts) {
    return data.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  },

  // Search by title or content
  search(query, data = posts) {
    const lowerQuery = query.toLowerCase();

    return data.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery),
    );
  },

  // Sort by title
  sortByTitle(order = 'asc', data = posts) {
    return data.toSorted((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  },

  // Sort by ID
  sortById(order = 'asc', data = posts) {
    return data.toSorted((a, b) => {
      if (order === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  },
};
