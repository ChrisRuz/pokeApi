import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});
