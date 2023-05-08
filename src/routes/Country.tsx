import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Country, getCountryByCode } from '../utils/api';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Country = () => {
  const { cca2 } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!cca2) throw new Response('Country not found', { status: 500 });

    getCountryByCode(cca2).then((countries) => {
      setCountry(countries[0]);
      setIsLoading(false);
    });
  }, [cca2]);

  return (
    <Container sx={{ px: 3 }}>
      {!isLoading ? (
        <>
          <Link to="..">
            <Button variant="contained" sx={{ bgcolor: 'primary.dark' }}>
              <KeyboardBackspaceIcon />
              <Typography>Back</Typography>
            </Button>
          </Link>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Card sx={{ minWidth: '200px' }}>
              <CardMedia image={country?.flags.png} />
            </Card>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            translate: '-50% 0',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Country;
