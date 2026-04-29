type TypeFilterProps = {
  types: string[];
  selectedType: string;
  onChange: (type: string) => void;
};

export function TypeFilter({ types, selectedType, onChange }: TypeFilterProps) {
  return (
    <select
      className="type-select"
      value={selectedType}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All Types</option>

      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}