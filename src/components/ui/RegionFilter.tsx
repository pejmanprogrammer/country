'use client';

import type { Region } from '@/features/countries/types';

interface RegionFilterProps {
  value: Region | 'All';
  onChange: (
    value: Region | 'All',
  ) => void;
}

const regions: Array<Region | 'All'> = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
];

export default function RegionFilter({
  value,
  onChange,
}: RegionFilterProps) {
  return (
    <label className="region-filter">
      <span className="sr-only">
        Filter by region
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as
              | Region
              | 'All',
          )
        }
      >
        {regions.map((region) => (
          <option
            key={region}
            value={region}
          >
            {region === 'All'
              ? 'Filter by Region'
              : region}
          </option>
        ))}
      </select>
    </label>
  );
}