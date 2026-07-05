import type { Post } from '../pages/blog/types';

const title = 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk';
const description = 'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.';

export const ALL_POSTS: Post[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  image: `https://placehold.co/400x250/1a237e/ffffff?text=Post+${i + 1}`,
  date: 'April 25, 2021',
  title: title,
  description: description,
}));