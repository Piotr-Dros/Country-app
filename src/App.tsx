import { useMemo } from 'react';

// Material UI
import {
  CssBaseline,
  GlobalStyles,
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
import Home from './routes/Home';
import Country from './routes/Country';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/country/:code',
        element: <Country />,
      },
    ],
  },
]);

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    typography: {
      h1: {
        fontSize: 30,
        fontWeight: 800,
      },
      h2: {
        fontSize: 26,
        fontWeight: 800,
      },
      h3: {
        fontSize: 23,
        fontWeight: 800,
        '@media (max-width: 600px)': {
          fontSize: 16,
        },
      },
      h4: {
        fontSize: 20,
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: 14,
        fontWeight: 600,
      },
      subtitle2: {
        fontSize: 13,
        fontWeight: 300,
      },
      body1: {
        fontSize: 12,
        fontWeight: 300,
      },
      body2: {
        fontSize: 9,
        fontWeight: 300,
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
              secondary: '#444',
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
      <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
