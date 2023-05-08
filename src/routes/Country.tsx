import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Country, getCountryByCode } from '../utils/api';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

type CountryInfo = {
  label: string;
  render: (country: Country) => ReactNode;
};

const firstColumnInfos: CountryInfo[] = [
  {
    label: 'Native Name',
    render: (country) => {
      const nativeNames = Object.values(country.name.nativeName).map(
        (nativeName) => nativeName.common
      );
      return <>{nativeNames.join(', ')}</>;
    },
  },
  {
    label: 'Population',
    render: (country) => <>{country.population}</>,
  },
  {
    label: 'Region',
    render: (country) => <>{country.region}</>,
  },
  {
    label: 'Sub Region',
    render: (country) => <>{country.subregion}</>,
  },
  {
    label: 'Capital',
    render: (country) => <>{country.capital.join(', ')}</>,
  },
];

const secondColumnInfos: CountryInfo[] = [
  {
    label: 'Top Level Domain',
    render: (country) => <>{country.tld.join(', ')}</>,
  },
  {
    label: 'Currencies',
    render: (country) => {
      const currencyNames = Object.values(country.currencies).map(
        (currency) => currency.name
      );
      return <>{currencyNames.join(', ')}</>;
    },
  },
  {
    label: 'Languages',
    render: (country) => <>{Object.values(country.languages).join(', ')}</>,
  },
];

const Country = () => {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (!code) throw new Response('Country not found', { status: 500 });

    getCountryByCode(code).then((countries) => {
      setCountry(countries[0]);
      setIsLoading(false);
    });
  }, [code]);

  return (
    <Container sx={{ px: 3 }}>
      {!isLoading ? (
        <>
          <Button
            variant="contained"
            sx={{ bgcolor: 'primary.dark', mb: 5, objectFit: 'cover' }}
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspaceIcon />
            <Typography>Back</Typography>
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 4,
              justifyContent: 'space-between',
            }}
          >
            <Box
              component="img"
              src={country?.flags.png}
              alt={country?.flags.alt}
              sx={{
                width: {
                  xs: 'min(350px, 100%)',
                  sm: 'clamp(200px, 35vw, 800px)',
                },
                aspectRatio: '3 / 2',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            />
            <Box>
              <Box>
                <Typography variant="h2" sx={{ mb: 3 }}>
                  {country?.name.common}
                </Typography>
                <Box sx={{ display: 'flex', gap: 10 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                  >
                    {firstColumnInfos.map((info) => (
                      <Box
                        key={info.label}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="subtitle2">
                          {info.label}
                        </Typography>
                        <Typography variant="body2">
                          {country ? info.render(country) : 'Country not found'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    {secondColumnInfos.map((info) => (
                      <Box
                        key={info.label}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="subtitle2">
                          {info.label}
                        </Typography>
                        <Typography variant="body2">
                          {country ? info.render(country) : 'Country not found'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 2,
                  mt: 5,
                }}
              >
                <Typography variant="subtitle2">Border Countries:</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    maxWidth: '300px',
                  }}
                >
                  {country?.borders.map((code) => (
                    <Link key={code} to={`/country/${code}`}>
                      <Button variant="contained" size="small">
                        {code}
                      </Button>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
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
