export interface Author {
  slug:  string;
  name:  string;
  bio:   string;
  photo: string | null;
}

export const authors: Author[] = [
  {
    slug:  'sara-vitale',
    name:  'Sara Vitale',
    bio:   'Sara Vitale writes about cappuccinos at cappuccino.io. She has opinions about cup shapes, milk temperature, and what counts as an acceptable hour to order one. (The answer: any of them.)',
    photo: null,
  },
];

export const authorsBySlug = Object.fromEntries(authors.map(a => [a.slug, a]));
