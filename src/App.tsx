import { useMemo } from 'react';

// Material UI
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import useDarkMode from './hooks/useDarkMode';

// React Router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// routes
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
