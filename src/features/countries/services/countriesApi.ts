import type { Country } from '../types';

const API_BASE_URL = '/api/countries';

async function handleResponse<T>(
  response: Response,
): Promise<T> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.message ||
        `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(API_BASE_URL);

  return handleResponse<Country[]>(response);
}

export async function getCountryByCode(
  code: string,
): Promise<Country> {
  const response = await fetch(
    `${API_BASE_URL}/${code}`,
  );

  return handleResponse<Country>(response);
}