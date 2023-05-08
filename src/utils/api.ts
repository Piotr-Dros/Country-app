type NativeName = {
  official: string;
  common: string;
};

type Currency = {
  name: string;
  symbol: string;
};

type Translation = {
  official: string;
  common: string;
};

type Flag = {
  png: string;
  svg: string;
  alt: string;
};

type CountryName = {
  common: string;
  official: string;
  nativeName: {
    [index: string]: NativeName;
  };
};

export type Country = {
  name: CountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  currencies: {
    [index: string]: Currency;
  };
  capital: string[];
  altSpellings: string[];
  region: Region;
  subregion: string;
  languages: {
    [index: string]: string;
  };
  translations: {
    [index: string]: Translation;
  };
  area: number;
  population: number;
  flags: Flag;
};

export type Region =
  | 'africa'
  | 'america'
  | 'asia'
  | 'europe'
  | 'oceania'
  | 'none';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const baseUrl = 'https://restcountries.com/v3.1';

export const getAllCountries = async (): Promise<Country[]> => {
  await sleep(2000);
  const response = await fetch(`${baseUrl}/all`, {
    method: 'GET',
  });
  return response.json();
};

export const getCountryByCode = async (code: string): Promise<Country[]> => {
  await sleep(2000);
  const response = await fetch(`${baseUrl}/alpha/${code}`, {
    method: 'GET',
  });
  return response.json();
};
