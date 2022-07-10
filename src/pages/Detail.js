import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function DetailPage() {
  const location = useLocation();
  const pokemonName = location.pathname.split('/')[2];
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolution, setEvolution] = useState(null);

  const fetchPokemon = async () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  };

  const fetchSpecies = async () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecies(data);
      });
  };

  const fetchData = async () => {
    await fetchPokemon();
    await fetchSpecies();
  };

  useEffect(() => {
    if (pokemonName) {
      fetchData();
    }
  }, [pokemonName]);

  // fetching species
  useEffect(() => {
    if (species && species.evolution_chain) {
      fetch(species.evolution_chain.url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEvolution(data);
        });
    }
  }, [species]);

  return (
    <div>
      {pokemon && (
        <div>
          <h1 className='text-5xl capitalize'>{pokemon.name}</h1>
          <div className='grid grid-cols-4'>
            <img src={pokemon.sprites.back_default} alt='' />
            <img src={pokemon.sprites.back_female} alt='' />
            <img src={pokemon.sprites.back_shiny} alt='' />
            <img src={pokemon.sprites.back_shiny_female} alt='' />
            <img src={pokemon.sprites.front_default} alt='' />
            <img src={pokemon.sprites.front_female} alt='' />
            <img src={pokemon.sprites.front_shiny} alt='' />
            <img src={pokemon.sprites.front_shiny_female} alt='' />
          </div>
          {evolution && (
            <div>
              <h2 className='text-3xl font-bold'>Evolutions</h2>
              <div>
                {evolution.chain.species.name} >{' '}
                {evolution.chain.evolves_to.map((v) => v.species.name)}
              </div>
            </div>
          )}
          <h2 className='text-3xl font-bold'>Stats</h2>
          <div className='grid grid-cols-2'>
            <span>Weight: {pokemon.weight}</span>
            <span>Height: {pokemon.height}</span>
            <span>Base Experience: {pokemon.base_experience}</span>
            <span>
              Type: {pokemon.types.map((v) => v.type.name).join(', ')}
            </span>
          </div>
          <h2 className='text-3xl font-bold'>Moves</h2>
          <div className='grid grid-cols-3'>
            {pokemon.moves.map((v) => (
              <span key={v.move.name}>{v.move.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
