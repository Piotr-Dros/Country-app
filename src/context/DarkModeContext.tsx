import { PaletteMode, useMediaQuery } from '@mui/material';
import { ReactNode, createContext, useState } from 'react';

export type DarkModeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<PaletteMode>(
    !prefersDarkMode ? 'light' : 'dark'
  );

  const toggleColorMode = () => {
    setMode((prev: PaletteMode) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <DarkModeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
