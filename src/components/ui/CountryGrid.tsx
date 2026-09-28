import type { Country } from '@/features/countries/types';

import CountryCard from './CountryCard';

interface CountryGridProps {
  countries: Country[];
}

export default function CountryGrid({
  countries,
}: CountryGridProps) {
  if (countries.length === 0) {
    return (
      <p className="empty-state">
        No countries found.
      </p>
    );
  }

  return (
    <section className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </section>
  );
}