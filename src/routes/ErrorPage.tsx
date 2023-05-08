import { Container, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <Container>
      <Typography variant="h1">Oops!</Typography>
      <Typography>Sorry, an unexpected error has occurred.</Typography>
      <Typography>
        <i>{error instanceof Error ? error.message : 'Error not found'}</i>
      </Typography>
    </Container>
  );
};

export default ErrorPage;
