import { useEffect, useState } from "react";

const STORAGE_KEY = "pokedex-lite-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id: number) {
    return favorites.includes(id);
  }

  function toggleFavorite(id: number) {
    setFavorites((previous) => {
      if (previous.includes(id)) {
        return previous.filter((pokemonId) => pokemonId !== id);
      }

      return [...previous, id];
    });
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}