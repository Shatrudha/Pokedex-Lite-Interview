import type { PokemonDetails } from "../types/pokemon";

type PokemonModalProps = {
  pokemon: PokemonDetails | null;
  onClose: () => void;
};

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  if (!pokemon) return null;

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "";

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <img src={image} alt={pokemon.name} className="modal-image" />

        <h2>{pokemon.name}</h2>

        <p>#{pokemon.id}</p>

        <div className="details-row">
          <span>Height: {pokemon.height}</span>
          <span>Weight: {pokemon.weight}</span>
        </div>

        <h3>Abilities</h3>
        <div className="type-list">
          {pokemon.abilities.map((item) => (
            <span key={item.ability.name} className="type-badge">
              {item.ability.name}
            </span>
          ))}
        </div>

        <h3>Stats</h3>
        <div className="stats-list">
          {pokemon.stats.map((item) => (
            <div key={item.stat.name} className="stat-row">
              <span>{item.stat.name}</span>
              <strong>{item.base_stat}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}