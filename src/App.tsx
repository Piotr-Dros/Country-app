import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import useDarkMode from './hooks/useDarkMode';
import { useMemo } from 'react';

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {},
    palette: {
      mode,
      ...(mode === 'light' ? {} : {}),
    },
  });
};

const App = () => {
  const { mode } = useDarkMode();
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
