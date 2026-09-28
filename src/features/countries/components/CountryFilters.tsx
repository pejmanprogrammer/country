'use client';

import SearchBar from '@/components/ui/SearchBar';
import RegionFilter from '@/components/ui/RegionFilter';

import type { Region } from '../types';

interface CountryFiltersProps {
  search: string;
  region: Region | 'All';
  onSearchChange: (
    value: string,
  ) => void;
  onRegionChange: (
    value: Region | 'All',
  ) => void;
}

export default function CountryFilters({
  search,
  region,
  onSearchChange,
  onRegionChange,
}: CountryFiltersProps) {
  return (
    <section className="country-filters">
      <SearchBar
        value={search}
        onChange={onSearchChange}
      />

      <RegionFilter
        value={region}
        onChange={onRegionChange}
      />
    </section>
  );
}