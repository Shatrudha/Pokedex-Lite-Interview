type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search Pokémon by name..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}