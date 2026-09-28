'use client';

import { useQuery } from '@tanstack/react-query';

import { getCountries } from '../services/countriesApi';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 1000 * 60 * 10,
  });
}