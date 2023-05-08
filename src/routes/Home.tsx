import { useEffect } from 'react';
import useLoadingList from '../hooks/useLoadingList';
import { Country, getAllCountries } from '../utils/api';

import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import CountryCard from '../components/CountryCard';

const Home = () => {
  const {
    items: countries,
    setItems: setCountries,
    isLoading,
    setIsLoading,
    visibleCount,
    loadMore,
  } = useLoadingList<Country>();

  useEffect(() => {
    setIsLoading(true);
    getAllCountries().then((receivedCountries) => {
      setCountries(receivedCountries);
      setIsLoading(false);
    });
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {!isLoading ? (
        <>
          <Grid container spacing={2}>
            {countries?.slice(0, visibleCount)?.map((country) => (
              <Grid item>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>
          <Button onClick={loadMore}>Load more</Button>
        </>
      ) : (
        <Box sx={{ position: 'absolute', top: '50%' }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Home;
