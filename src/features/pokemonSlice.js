import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemons = await Promise.all(response.data.results.map(async (result) => {
        const pokemonData = await axios.get(result.url);
        return {
          name: pokemonData.data.name,
          image: pokemonData.data.sprites.front_default
        };
      }));
      return pokemons;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default pokemonSlice.reducer;
