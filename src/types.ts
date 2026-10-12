export const COURSES = ['Starters', 'Mains', 'Dessert'];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
};

// The screens in the app and the data each one receives when navigated to.
export type RootStackParamList = {
  Welcome: undefined;
  Home: { role: 'chef' | 'guest' };
  ManageMenu: undefined;
};
