
export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCurrency {
  name: string;
  symbol?: string;
}

export interface Country {
  name: CountryName;
  cca2: string;
  cca3: string;
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  currencies?: Record<string, CountryCurrency>;
  languages?: Record<string, string>;
  borders?: string[];
  flags: CountryFlags;
}

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania';

export type Theme = 'light' | 'dark';

export type CountriesStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';