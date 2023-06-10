const BASE_URL = 'https://api.thecatapi.com/v1/';
const options = {
  headers: {
    'x-api-key':
      'live_XxGrRvjwQ23boQKEShlNa8zxC6R0lOBqnOaUrzNBXnYPlcjyYLV6WIcWnIzAHNjt',
  },
};

export function fetchBreeds() {
  return fetch(BASE_URL + 'breeds').then(r => {
    if (r.ok) {
      return r.json();
    }
    throw new Error(r.statusText || r.status);
  });
}

export function getCatInfo(id) {
  return fetch(`${BASE_URL}images/search?breed_ids=${id}`, options).then(r => {
    if (r.ok) {
      return r.json();
    }
    throw new Error(r.statusText || r.status);
  });
}
