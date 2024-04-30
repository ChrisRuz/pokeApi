import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../features/pokemonSlice';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import '../styles/PokemonList.css'; 

const HomePage = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const status = useSelector((state) => state.pokemons.status);
  const error = useSelector((state) => state.pokemons.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * 6;
  const indexOfFirstPokemon = indexOfLastPokemon - 6;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="centered-container">
      <h1 className="title">Christian Emmanuel Ruz Castillo</h1>
      <SearchBar onSearch={handleSearch} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && <PokemonList pokemons={currentPokemons} />}
      <div className="pagination-buttons">
        <button onClick={prevPage} disabled={currentPage === 1} className="prevPage">Previous Page</button>
        <button onClick={nextPage} disabled={indexOfLastPokemon >= filteredPokemons.length} className="nextPage">Next Page</button>
      </div>
    </div>
  );
};

export default HomePage;
