import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import useDarkMode from '../hooks/useDarkMode';

const Navigation = () => {
  const { mode, toggleColorMode } = useDarkMode();

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 2,
        bgcolor: 'background.default',
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color="primary.dark" variant="h3" component="h2">
          Where in the world
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: 'primary.dark' }}
          onClick={() => toggleColorMode()}
        >
          {mode === 'light' ? <DarkModeOutlinedIcon /> : <DarkModeIcon />}
          <Typography>Dark Mode</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
