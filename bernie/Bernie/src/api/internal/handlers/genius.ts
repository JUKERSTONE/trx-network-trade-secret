export const genius = ({method, payload}: any) => {
  const base = 'https://api.genius.com/';

  const {query} = payload;

  switch (method) {
    case 'search':
      return `${base}/search?q=${query}`;
  }
};
