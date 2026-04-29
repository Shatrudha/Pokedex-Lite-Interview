import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  fetchPokemonByType,
  fetchPokemonDetails,
  fetchPokemonList,
  fetchPokemonTypes,
} from "./api/pokemonApi";

import { ErrorMessage } from "./components/ErrorMessage";
import { Loader } from "./components/Loader";
import { Pagination } from "./components/Pagination";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonModal } from "./components/PokemonModal";
import { SearchBar } from "./components/SearchBar";
import { TypeFilter } from "./components/TypeFilter";
import { useFavorites } from "./hooks/useFavorites";
import type { PokemonDetails, PokemonListItem } from "./types/pokemon";

const PAGE_LIMIT = 20;

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();

  async function loadTypes() {
    try {
      const data = await fetchPokemonTypes();
      setTypes(data.results.map((item) => item.name));
    } catch {
      setTypes([]);
    }
  }

  async function loadPokemon() {
    setLoading(true);
    setError("");

    try {
      if (selectedType) {
        const typeData = await fetchPokemonByType(selectedType);

        const start = (page - 1) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;

        const pageItems = typeData.pokemon
          .slice(start, end)
          .map((item) => item.pokemon);

        setTotalCount(typeData.pokemon.length);

        const details = await Promise.all(
          pageItems.map((item: PokemonListItem) => fetchPokemonDetails(item.url))
        );

        setPokemonList(details);
      } else {
        const offset = (page - 1) * PAGE_LIMIT;
        const listData = await fetchPokemonList(PAGE_LIMIT, offset);

        setTotalCount(listData.count);

        const details = await Promise.all(
          listData.results.map((item) => fetchPokemonDetails(item.url))
        );

        setPokemonList(details);
      }
    } catch {
      setError("Something went wrong while loading Pokémon.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTypes();
  }, []);

  useEffect(() => {
    loadPokemon();
  }, [page, selectedType]);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const filteredPokemon = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) return pokemonList;

    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );
  }, [pokemonList, searchText]);

  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

  return (
    <main className="app">
      <header className="header">
        <h1>Pokedex Lite</h1>
        <p>Search, filter, and favorite your Pokémon.</p>
      </header>

      <section className="controls">
        <SearchBar value={searchText} onChange={setSearchText} />

        <TypeFilter
          types={types}
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </section>

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={loadPokemon} />
      )}

      {!loading && !error && filteredPokemon.length === 0 && (
        <div className="empty-state">
          No Pokémon found.
        </div>
      )}

      {!loading && !error && filteredPokemon.length > 0 && (
        <section className="pokemon-grid">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
              onOpenDetails={setSelectedPokemon}
            />
          ))}
        </section>
      )}

      {!loading && !error && (
        <Pagination
          page={page}
          canGoPrevious={page > 1}
          canGoNext={page < totalPages}
          onPrevious={() => setPage((current) => Math.max(current - 1, 1))}
          onNext={() => setPage((current) => current + 1)}
        />
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </main>
  );
}

export default App;