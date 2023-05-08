import { ReactNode } from 'react';
import { Country } from '../utils/api';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

type CountryCardInfo = {
  label: string;
  render: (country: Country) => ReactNode;
};

const countryCardInfos: CountryCardInfo[] = [
  {
    label: 'Population',
    render: (country) => <>{country.population}</>,
  },
  {
    label: 'Region',
    render: (country) => <>{country.region}</>,
  },
  {
    label: 'Capital',
    render: (country) => <>{country.capital?.join(', ')}</>,
  },
];

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <Card
      sx={{
        bgcolor: 'background.default',
        height: '320px',
        cursor: 'pointer',
        transition: 'scale 250ms',
        '&:hover': {
          scale: '1.05',
        },
      }}
    >
      <CardMedia
        component="img"
        image={country.flags.png}
        alt={country.flags.alt}
        height={'45%'}
      />
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {country.name.common}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {countryCardInfos.map((countryCardInfo) => (
            <Box
              key={countryCardInfo.label}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {countryCardInfo.label}:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {countryCardInfo.render(country)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
