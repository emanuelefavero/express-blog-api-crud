const ALLOWED_SORT_FIELDS = ['id', 'title'];
const ALLOWED_SORT_ORDERS = ['asc', 'desc'];

export const validatePostQuery = ({ tag, search, sortBy, order, _limit }) => {
  if (tag && (typeof tag !== 'string' || !tag.trim())) {
    return 'Il parametro tag deve essere una stringa non vuota';
  }

  if (search && (typeof search !== 'string' || !search.trim())) {
    return 'Il parametro search deve essere una stringa non vuota';
  }

  if (sortBy && !ALLOWED_SORT_FIELDS.includes(sortBy)) {
    return `Campo sortBy non valido. I valori consentiti sono: ${ALLOWED_SORT_FIELDS.join(', ')}`;
  }

  if (order && !sortBy) {
    return 'Il parametro order richiede il parametro sortBy';
  }

  if (order && !ALLOWED_SORT_ORDERS.includes(order)) {
    return `Campo order non valido. I valori consentiti sono: ${ALLOWED_SORT_ORDERS.join(', ')}`;
  }

  if (_limit) {
    if (typeof _limit !== 'string') {
      return 'Il parametro _limit deve avere un solo valore';
    }

    const limit = Number(_limit);

    if (!Number.isInteger(limit) || limit <= 0) {
      return 'Il parametro _limit deve essere un numero intero positivo';
    }
  }

  return null;
};

export const validatePostId = (id) =>
  !Number.isInteger(id) || id <= 0
    ? "L'id deve essere un numero intero positivo"
    : null;

export const validatePostData = (postData) => {
  if (!postData || typeof postData !== 'object' || Array.isArray(postData)) {
    return 'Il body deve essere un oggetto JSON';
  }

  if (Object.hasOwn(postData, 'id')) {
    return 'Il campo id viene generato dal server e non deve essere inviato';
  }

  const { title, content, image, tags } = postData;

  if (typeof title !== 'string' || !title.trim()) {
    return 'Il campo title è obbligatorio e deve essere una stringa non vuota';
  }

  if (typeof content !== 'string' || !content.trim()) {
    return 'Il campo content è obbligatorio e deve essere una stringa non vuota';
  }

  if (typeof image !== 'string' || !image.trim()) {
    return 'Il campo image deve essere una stringa non vuota';
  }

  if (!Array.isArray(tags)) {
    return 'Il campo tags è obbligatorio e deve essere un array';
  }

  const hasInvalidTag = tags.some(
    (tag) => typeof tag !== 'string' || !tag.trim(),
  );

  if (hasInvalidTag) {
    return 'Tutti i tag devono essere stringhe non vuote';
  }

  return null;
};

export const normalizePostData = ({ title, content, image, tags }) => ({
  title: title.trim(),
  content: content.trim(),
  image: image.trim(),
  tags: tags.map((tag) => tag.trim().toLowerCase()),
});
