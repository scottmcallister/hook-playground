export type Maybe<T> = T | null;
export type Pokemon = {
  id: number;
  image: string;
  name: string;
  types: string[];
  height: number;
  weight: number;
}
export type PartialPokemon = Partial<Pokemon>;

export type PokeProps = PartialPokemon & {
  loading: boolean;
  error: boolean;
};

export type PokeDexProps = {
  pokemonId: number;
};
