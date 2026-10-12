export const COURSES = ['Starters', 'Mains', 'Dessert'] as const;

export type Course = (typeof COURSES)[number];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

export type Role = 'chef' | 'guest';
