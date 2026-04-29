import type { PokemonDetails } from "../types/pokemon";

type PokemonCardProps = {
  pokemon: PokemonDetails;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (pokemon: PokemonDetails) => void;
};

export function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: PokemonCardProps) {
  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "";

  return (
    <div className="pokemon-card" onClick={() => onOpenDetails(pokemon)}>
      <button
        type="button"
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(pokemon.id);
        }}
      >
        {isFavorite ? "♥️" : "♡"}
      </button>

      <img src={image} alt={pokemon.name} />

      <h3>{pokemon.name}</h3>

      <div className="type-list">
        {pokemon.types.map((item) => (
          <span key={item.type.name} className="type-badge">
            {item.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}