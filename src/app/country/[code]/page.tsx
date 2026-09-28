
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';

import type { Country } from '@/features/countries/types';

interface CountryDetailsPageProps {
  params: Promise<{
    code: string;
  }>;
}

async function getCountry(
  code: string,
): Promise<Country | null> {
  const apiKey =
    process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    throw new Error(
      'REST_COUNTRIES_API_KEY is not configured.',
    );
  }

  const response = await fetch(
    `https://api.restcountries.com/countries/v5/codes.alpha_3/${encodeURIComponent(code)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const body = await response.json();

  const countries =
    body?.data?.objects ?? [];

  const country = countries[0];

  if (!country) {
    return null;
  }

  return {
    name: {
      common:
        country.names?.common ?? '',
      official:
        country.names?.official ?? '',
      nativeName:
        country.names?.native ?? {},
    },

    cca2:
      country.codes?.alpha_2 ?? '',

    cca3:
      country.codes?.alpha_3 ?? '',

    population:
      country.population ?? 0,

    region:
      country.region ?? '',

    subregion:
      country.subregion ?? '',

    capital:
      country.capitals?.map(
        (capital: {
          name: string;
        }) => capital.name,
      ) ?? [],

    tld:
      country.tlds ?? [],

    currencies:
      Object.fromEntries(
        (country.currencies ?? []).map(
          (currency: {
            code: string;
            name: string;
            symbol?: string;
          }) => [
            currency.code,
            {
              name: currency.name,
              symbol: currency.symbol,
            },
          ],
        ),
      ),

    languages:
      Object.fromEntries(
        (country.languages ?? []).map(
          (language: {
            bcp47?: string;
            name: string;
          }) => [
            language.bcp47 ?? language.name,
            language.name,
          ],
        ),
      ),

    borders:
      country.borders ?? [],

    flags: {
      png:
        country.flag?.url_png ?? '',

      svg:
        country.flag?.url_svg ?? '',

      alt:
        country.flag?.description ?? '',
    },
  };
}

export async function generateMetadata({
  params,
}: CountryDetailsPageProps): Promise<Metadata> {
  const { code } = await params;

  const country = await getCountry(code);

  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.name.common} | Where in the World?`,
    description: `Learn more about ${country.name.common}.`,
  };
}

export default async function CountryDetailsPage({
  params,
}: CountryDetailsPageProps) {
  const { code } = await params;

  const country = await getCountry(code);

  if (!country) {
    notFound();
  }

  const flagSource =
    country.flags.svg ||
    country.flags.png;

  return (
    <>
      <Header />

      <main className="page-container country-details">
        <Link
          href="/"
          className="back-button"
        >
          ← Back
        </Link>

        <section className="country-details__content">
          <div className="country-details__flag">
            {flagSource ? (
              <img
                src={flagSource}
                alt={
                  country.flags.alt ||
                  `Flag of ${country.name.common}`
                }
              />
            ) : (
              <div>
                Flag unavailable
              </div>
            )}
          </div>

          <div className="country-details__info">
            <h1>
              {country.name.common}
            </h1>

            <div className="country-details__columns">
              <div>
                <p>
                  <strong>
                    Native Name:
                  </strong>{' '}
                  {getNativeName(country)}
                </p>

                <p>
                  <strong>
                    Population:
                  </strong>{' '}
                  {country.population.toLocaleString()}
                </p>

                <p>
                  <strong>
                    Region:
                  </strong>{' '}
                  {country.region}
                </p>

                <p>
                  <strong>
                    Sub Region:
                  </strong>{' '}
                  {country.subregion ||
                    'N/A'}
                </p>

                <p>
                  <strong>
                    Capital:
                  </strong>{' '}
                  {country.capital?.join(
                    ', ',
                  ) || 'N/A'}
                </p>
              </div>

              <div>
                <p>
                  <strong>
                    Top Level Domain:
                  </strong>{' '}
                  {country.tld?.join(', ') ||
                    'N/A'}
                </p>

                <p>
                  <strong>
                    Currencies:
                  </strong>{' '}
                  {getCurrencies(country)}
                </p>

                <p>
                  <strong>
                    Languages:
                  </strong>{' '}
                  {getLanguages(country)}
                </p>
              </div>
            </div>

            <div className="border-countries">
              <strong>
                Border Countries:
              </strong>

              <div className="border-countries__list">
                {country.borders?.length ? (
                  country.borders.map(
                    (border) => (
                      <Link
                        key={border}
                        href={`/country/${border}`}
                        className="border-country"
                      >
                        {border}
                      </Link>
                    ),
                  )
                ) : (
                  <span>
                    No border countries
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function getNativeName(
  country: Country,
): string {
  const nativeNames =
    country.name.nativeName;

  if (!nativeNames) {
    return country.name.common;
  }

  const firstNativeName =
    Object.values(nativeNames)[0];

  return (
    firstNativeName?.common ||
    country.name.common
  );
}

function getCurrencies(
  country: Country,
): string {
  if (!country.currencies) {
    return 'N/A';
  }

  return Object.values(
    country.currencies,
  )
    .map(
      (currency) =>
        `${currency.name}${
          currency.symbol
            ? ` (${currency.symbol})`
            : ''
        }`,
    )
    .join(', ');
}

function getLanguages(
  country: Country,
): string {
  if (!country.languages) {
    return 'N/A';
  }

  return Object.values(
    country.languages,
  ).join(', ');
}