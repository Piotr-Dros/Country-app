import { useEffect, useState } from 'react';
import useLoadingList from '../hooks/useLoadingList';
import { Country, Region, getAllCountries } from '../utils/api';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material';

import CountryCard from '../components/CountryCard';
import { Link } from 'react-router-dom';
import SelectRegion from '../components/Select';

const Home = () => {
  const {
    items: countries,
    setItems: setCountries,
    isLoading,
    setIsLoading,
    visibleCount,
    loadMore,
  } = useLoadingList<Country>();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectTerm, setSelectTerm] = useState<Region>('');

  useEffect(() => {
    setIsLoading(true);
    getAllCountries().then((receivedCountries) => {
      setCountries(receivedCountries);
      setIsLoading(false);
    });
  }, []);

  const renderedCountries = countries
    ?.filter((country) => {
      if (searchTerm === '') return country;
      if (
        country.name.common
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      ) {
        return country;
      }
    })
    .filter((country) => {
      if (selectTerm === '') return country;
      if (country.region.toLocaleLowerCase().includes(selectTerm)) {
        return country;
      }
    })
    .slice(0, visibleCount)
    .map((country) => (
      <Grid item key={country.cca2} xs={12} sm={6} md={4} lg={3}>
        <Link to={`/country/${country.cca2}`}>
          <CountryCard country={country} />
        </Link>
      </Grid>
    ));

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <TextField
          label="Search for a country..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SelectRegion
          onChange={(e) => setSelectTerm(e.target.value as Region)}
        />
      </Box>
      {!isLoading ? (
        <>
          <Grid container spacing={4}>
            {renderedCountries}
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
