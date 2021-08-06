const books = [
  {
    ISBN: '12345Book',
    title: 'Tesla',
    pubDate: '2021-08-05',
    language: 'en',
    numPage: 250,
    author: [1, 2],
    publications: [1],
    category: ['tech', 'space', 'education'],
  },
  {
    ISBN: '12345678Book',
    title: 'Spacex',
    pubDate: '2020-09-06',
    language: 'en',
    numPage: 400,
    author: [2],
    publications: [2],
    category: ['tech', 'space', 'science'],
  },
];

const author = [
  {
    id: 1,
    name: 'Elon Musk',
    books: ['12345Book', '111secretBook'],
  },
  {
    id: 2,
    name: 'Vaishnav',
    books: ['12345678Book'],
  },
];

const publication = [
  {
    id: 1,
    name: 'writex',
    books: ['12345Book'],
  },
  {
    id: 2,
    name: 'bookpusblishers',
    books: ['12345678Book'],
  },
];

module.exports = { books, author, publication };
