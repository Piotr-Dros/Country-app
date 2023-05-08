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
    <Card>
      <CardMedia
        component="img"
        image={country.flags.png}
        alt={country.flags.alt}
      />
      <CardContent>
        <Typography variant="h4">{country.name.common}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {countryCardInfos.map((countryCardInfo) => (
            <Box key={countryCardInfo.label}>
              <Typography variant="subtitle1">
                {countryCardInfo.label}
              </Typography>
              <Typography variant="body1">
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
