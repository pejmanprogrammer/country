
import { NextResponse } from 'next/server';

const API_URL =
  'https://api.restcountries.com/countries/v5';

export async function GET() {
  const apiKey =
    process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          'REST_COUNTRIES_API_KEY is not configured.',
      },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${API_URL}?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    const body = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            body?.errors?.[0]?.message ||
            'Failed to fetch countries.',
        },
        {
          status: response.status,
        },
      );
    }

    const countries =
      body?.data?.objects ?? [];

    const mappedCountries =
      countries.map(
        (country: any) => ({
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
              (capital: any) =>
                capital.name,
            ) ?? [],

          tld:
            country.tlds ?? [],

          currencies:
            country.currencies ?? {},

          languages:
            country.languages ?? {},

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
        }),
      );

    return NextResponse.json(
      mappedCountries,
    );
  } catch {
    return NextResponse.json(
      {
        message:
          'Unable to connect to countries API.',
      },
      { status: 500 },
    );
  }
}