import { NextResponse } from 'next/server';

const API_URL =
  'https://api.restcountries.com/countries/v5';

export async function GET() {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;

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

    if (!response.ok) {
      return NextResponse.json(
        {
          message: 'Failed to fetch countries.',
        },
        { status: response.status },
      );
    }

    const body = await response.json();

    const countries = body.data ?? body;

    return NextResponse.json(countries);
  } catch {
    return NextResponse.json(
      {
        message: 'Unable to connect to countries API.',
      },
      { status: 500 },
    );
  }
}