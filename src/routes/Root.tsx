import { Container } from '@mui/material';

import Navigation from '../components/Navigation';

import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Root;
