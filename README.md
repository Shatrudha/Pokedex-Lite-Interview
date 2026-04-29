# Pokedex Lite

A responsive Pokémon listing web app built using *React + TypeScript*.  
The app fetches data from the public *PokéAPI* and allows users to search, filter, paginate, favorite, and view Pokémon details.

## Live Demo

Hosted URL: (https://pokedex-lite-interview.vercel.app/)

## GitHub Repository

Repository URL: https://github.com/Shatrudha/Pokedex-Lite-Interview

---

## Features
# Pokedex Lite

## Features
- Pokémon list from API
- Search
- Filter by type
- Pagination
- Favorites (LocalStorage)

## Tech Stack
- React
- JavaScript
- CSS

## Run Locally
```bash
npm install
npm start

## Project Structure
src/
├── components/
│   ├── PokemonCard.tsx
│   ├── PokemonDetailModal.tsx
│   ├── SearchBar.tsx
│   ├── TypeFilter.tsx
│   └── Pagination.tsx
│
├── hooks/
│   └── useFavorites.ts
│
├── services/
│   └── pokemonApi.ts
│
├── types/
│   └── pokemon.ts
│
├── App.tsx
├── main.tsx
└── index.css


### Pokémon Listing

- Fetches Pokémon data from the PokéAPI.
- Displays Pokémon name and image in a clean responsive grid layout.
- Works well on mobile, tablet, and desktop screens.

### Search

- Users can search Pokémon by name.
- Search results update as the user types.

### Filter by Type

- Users can filter Pokémon by type such as Fire, Water, Grass, Electric, etc.
- The list updates based on the selected Pokémon type.

### Pagination

- Pokémon are loaded page by page instead of fetching everything at once.
- Users can move between pages using pagination controls.

### Favorites

- Users can mark Pokémon as favorites.
- Favorites are saved in browser local storage.
- Favorite Pokémon remain saved even after refreshing the page.

### Pokémon Detail View

- Clicking on a Pokémon opens a detail view/modal.
- The detail view includes extra information such as:
  - Pokémon image
  - Type
  - Abilities
  - Stats like HP, Attack, Defense, etc.
- Users can close the detail view and return to the main list.

### Loading and Error Handling

- Loading state is shown while data is being fetched.
- Error message is displayed if the API request fails.

---

## Tech Stack

- *React* – Used for building the user interface.
- *TypeScript* – Used for better type safety and cleaner code.
- *CSS / Tailwind CSS* – Used for styling and responsive layout.
- *PokéAPI* – Used as the public API source for Pokémon data.
- *Local Storage* – Used to persist favorite Pokémon after page refresh.
- *Vite* – Used for fast development and build setup.

---

## API Used

This project uses the public PokéAPI:
