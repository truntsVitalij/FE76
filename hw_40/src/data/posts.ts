import type { Post } from '../pages/blog/types';

const titles = [
  'Astronauts prep for new solar arrays on nearly seven-hour spacewalk',
  'The future of Mars colonization: challenges and solutions',
  'Deep space exploration: new horizons beyond our galaxy',
  'How satellites are changing life on Earth',
  'The James Webb telescope: first year discoveries',
  'SpaceX Starship: revolutionizing space travel',
  'Black holes: what we learned in 2024',
  'Living on ISS: a day in the life of an astronaut',
  'The race to the Moon: who will get there first'
];

export const ALL_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  image: `https://placehold.co/400x250/1a237e/ffffff?text=Post+${i + 1}`,
  date: 'April 25, 2021',
  title: titles[i]
}));