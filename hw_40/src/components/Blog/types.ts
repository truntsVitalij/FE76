export interface Post { id: number; image: string; date: string; title: string; }
export type TabType = 'All' | 'My favorite' | 'Popular';
export type BlogProps = Record<string, never>;