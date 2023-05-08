import { useEffect } from 'react';
import useLoadingList from '../hooks/useLoadingList';
import { Country, getAllCountries } from '../utils/api';

import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';

import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';

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
          <Grid container spacing={4}>
            {countries?.slice(0, visibleCount)?.map((country) => (
              <Grid item key={country.cca2} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/country/${country.cca2}`}>
                  <CountryCard country={country} />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Button onClick={loadMore} sx={{ m: 2 }}>
            Load more
          </Button>
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
