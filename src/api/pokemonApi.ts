import type { PokemonDetails, PokemonListItem } from "../types/pokemon"

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit: number, offset: number) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  return response.json() as Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
  }>;
}

export async function fetchPokemonDetails(
  nameOrUrl: string
): Promise<PokemonDetails> {
  const url = nameOrUrl.startsWith("http")
    ? nameOrUrl
    : `${BASE_URL}/pokemon/${nameOrUrl.toLowerCase()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }

  return response.json() as Promise<PokemonDetails>;
}

export async function fetchPokemonTypes() {
  const response = await fetch(`${BASE_URL}/type`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon types");
  }

  return response.json() as Promise<{
    results: { name: string; url: string }[];
  }>;
}

export async function fetchPokemonByType(type: string) {
  const response = await fetch(`${BASE_URL}/type/${type}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon by type");
  }

  return response.json() as Promise<{
    pokemon: {
      pokemon: PokemonListItem;
    }[];
  }>;
}