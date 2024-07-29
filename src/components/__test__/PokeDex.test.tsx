import { render, screen } from '@testing-library/react';
import PokeDex from '../PokeDex';
import usePokemon from '../../hooks/usePokemon';

jest.mock('../../hooks/usePokemon');

const mockData = {
  id: 1,
  name: 'bulbasaur',
  types: [
      'grass',
      'poison'
  ],
  height: 7,
  weight: 69,
  image: 'https://pokeapi.co/media/sprites/pokemon/1.png',
};

describe('PokeDex', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches pokemon data', async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon: mockData,
      loading: false,
      error: false
    });
    render(<PokeDex pokemonId={1} />);
    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('alt', mockData.name);
    const name = screen.getByText(/bulbasaur/i);
    expect(name).toBeInTheDocument();
  });

  it('handles error case', async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: false,
      error: true
    });

    render(<PokeDex pokemonId={1} />);
    const errorMessages = await screen.findAllByText(/Error/i);

    expect(errorMessages).toHaveLength(2);
  });

  it('shows loading icon', async () => {
    (usePokemon as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: true,
      error: false
    });
    render(<PokeDex pokemonId={1} />);
    const loadingIcon = await screen.findAllByTestId('loading');
    expect(loadingIcon.length > 0).toBeTruthy();
  });
});

