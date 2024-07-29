import { useEffect, useState } from 'react';
import { Maybe, Pokemon } from '../types';

const usePokemon = (pokemonId: number) => {
  const [pokemon, setPokemon] = useState<Maybe<Pokemon>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => res.json())
      .then(data => {
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          types: data.types.map((type: any) => type.type.name),
          height: data.height,
          weight: data.weight,
          image: data.sprites.front_default,
        };
        setPokemon(pokemon)
        setLoading(false);

      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [pokemonId]);
  return {
    pokemon,
    loading,
    error
  };
};

export default usePokemon;
