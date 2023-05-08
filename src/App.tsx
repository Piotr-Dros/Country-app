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
    typography: {
      h1: {
        fontSize: 24,
        fontWeight: 800,
      },
      h2: {
        fontSize: 20,
        fontWeight: 800,
      },
      h3: {
        fontSize: 18,
        fontWeight: 600,
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#e7c6ff',
              dark: '#c8b6ff',
              light: '#ffd6ff',
              contrastText: '#fff',
            },
            text: {
              primary: '#000',
            },
          }
        : {
            primary: {
              main: '#e7c6ff',
              dark: '#c8b6ff',
              light: '#ffd6ff',
              contrastText: '#fff',
            },
            text: {
              primary: '#fff',
            },
            background: {
              default: 'hsl(207, 26%, 17%)',
            },
          }),
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
