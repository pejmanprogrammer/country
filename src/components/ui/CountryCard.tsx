
import Link from 'next/link';

import type { Country } from '@/features/countries/types';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({
  country,
}: CountryCardProps) {
  const flagSource =
    country.flags.svg ||
    country.flags.png;

  return (
    <Link
      href={`/country/${country.cca3}`}
      className="country-card"
    >
      <div className="country-card__image-wrapper">
        {flagSource ? (
          <img
            src={flagSource}
            alt={
              country.flags.alt ||
              `Flag of ${country.name.common}`
            }
            className="country-card__image"
          />
        ) : (
          <div
            className="country-card__image"
            aria-label={`Flag of ${country.name.common} is unavailable`}
          />
        )}
      </div>

      <div className="country-card__content">
        <h2 className="country-card__name">
          {country.name.common}
        </h2>

        <p>
          <strong>Population:</strong>{' '}
          {country.population.toLocaleString()}
        </p>

        <p>
          <strong>Region:</strong>{' '}
          {country.region}
        </p>

        <p>
          <strong>Capital:</strong>{' '}
          {country.capital?.join(', ') ||
            'N/A'}
        </p>
      </div>
    </Link>
  );
}