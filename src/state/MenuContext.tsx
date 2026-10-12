import { createContext, ReactNode, useContext, useState } from 'react';
import { MenuItem } from '../types';

type MenuContextValue = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

// The single shared menu array lives in useState at the top of the app,
// so every screen reads from (and writes to) the same list.
export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems((current) => [...current, newItem]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used inside a MenuProvider');
  }
  return context;
}
