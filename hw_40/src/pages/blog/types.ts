export interface Post { 
    id: number; 
    image: string; 
    date: string; 
    title: string;
    description?: string; 
}
export type TabType = 'All' | 'My favorite' | 'Popular';