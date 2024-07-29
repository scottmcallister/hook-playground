import { renderHook, waitFor } from '@testing-library/react';
import usePokemon from '../usePokemon';

const mockData = {
  id: 1,
  name: 'bulbasaur',
  types: [
    {
      type: {
        name: 'grass'
      }
    }, 
    {
      type: {
        name: 'poison'
      }
    }
  ],
  height: 7,
  weight: 69,
  sprites: { front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png' },
};

describe('usePokemon', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches pokemon data', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    const { result } = renderHook(() => usePokemon(1));

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.error).toBeFalsy();
    expect(result.current.pokemon).toEqual({
      id: mockData.id,
      name: mockData.name,
      types: ['grass', 'poison'],
      height: mockData.height,
      weight: mockData.weight,
      image: mockData.sprites.front_default,
    });
  });

  it('handles error case', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    const { result } = renderHook(() => usePokemon(1));

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeFalsy();

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.pokemon).toBeNull();
  });
});
