'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <span
        className="search-bar__icon"
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        type="search"
        value={value}
        placeholder="Search for a country..."
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-label="Search for a country"
      />
    </div>
  );
}