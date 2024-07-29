import React from 'react';
import usePokemon from '../hooks/usePokemon';
import { PokeProps, PokeDexProps } from '../types';

const StatTable: React.FC<PokeProps> = ({ id, types, height, weight, loading, error }: PokeProps) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error loading stats</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Id</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td>Types</td>
          <td>{types?.join(', ')}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{((height ?? 0) / 10).toFixed(1)} m</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{((weight ?? 0) / 10).toFixed(1)} kg</td>
        </tr>
      </tbody>
    </table>
  );
}

const LoadingSpinner: React.FC = () => (
  <span data-testid="loading" className="loading loading-dots loading-lg"></span>
);


const PokemonImage: React.FC<PokeProps> = ({ image, loading, name, error }) => {
  let content;
  if (loading) { 
    content = <div className="w-full h-96 flex justify-center"><LoadingSpinner /></div>;
  } else if (error) {
    content = <div className="w-full h-96 bg-red-500 flex justify-center items-center">Error loading Pokemon</div>;
  } else {
    content = <img className="w-full bg-white" src={image} alt={name} />;
  }

  return (
    <figure>{content}</figure>
  );
}

const PokemonName: React.FC<PokeProps> = ({ error, loading, name }) => {
  if (error) return null;
  return (
    <h2 className="card-title px-4">
      {loading ? <LoadingSpinner /> : name}
    </h2>
  );
}

const PokeDex: React.FC<PokeDexProps> = ({ pokemonId }) => {
  const { pokemon, loading, error } = usePokemon(pokemonId);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <PokemonImage {...pokemon} loading={loading} error={error} />
      <div className="card-body">
        <PokemonName {...pokemon} loading={loading} error={error} />
        <StatTable {...pokemon} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default PokeDex;
