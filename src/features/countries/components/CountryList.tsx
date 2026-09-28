'use client';

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import CountryGrid from '@/components/ui/CountryGrid';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Loading from '@/components/ui/Loading';
import CountryFilters from '@/features/countries/components/CountryFilters';

import { useCountries } from '../hooks/useCountries';
import type { Region } from '../types';

export default function CountryList() {
  const {
    data: countries = [],
    isLoading,
    isError,
    error,
  } = useCountries();

  const [search, setSearch] =
    useState('');

  const [region, setRegion] =
    useState<Region | 'All'>('All');

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
    },
    [],
  );

  const handleRegionChange = useCallback(
    (value: Region | 'All') => {
      setRegion(value);
    },
    [],
  );

  const filteredCountries = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        country.name.common
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesRegion =
        region === 'All' ||
        country.region === region;

      return (
        matchesSearch && matchesRegion
      );
    });
  }, [countries, search, region]);

  if (isLoading) {
    return <Loading message="Loading countries..." />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error
            ? error.message
            : 'Unable to load countries.'
        }
      />
    );
  }

  return (
    <>
      <CountryFilters
        search={search}
        region={region}
        onSearchChange={
          handleSearchChange
        }
        onRegionChange={
          handleRegionChange
        }
      />

      <CountryGrid
        countries={filteredCountries}
      />
    </>
  );
}