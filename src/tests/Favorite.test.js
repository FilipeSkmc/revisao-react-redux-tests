/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


const mockStore = {
  personal: {
    email: ''
  },
  data: {
    characters: [],
    favorites: [
      {
        name: 'Pepe',
        id: 388,
        image: 'https://bobsburgers-api.herokuapp.com/images/characters/388.jpg'
      },
      {
        name: 'Pete',
        id: 389,
        image: 'https://bobsburgers-api.herokuapp.com/images/characters/389.jpg'
      }
    ]
  }
}

describe('Favorite', () => {
  it('Testar se os cards estão na tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />, mockStore, '/favorites');
    
    // verificar o estado global dentro de data -> characters
    expect(store.getState().data.favorites).toHaveLength(2);
    expect(store.getState().data.favorites).toEqual(mockStore.data.favorites);

    // verifica se existe 20 h2 com nomes
    const headings = screen.getAllByRole('heading', {level: 2});
    expect(headings).toHaveLength(2);

    // verifica se cada um dos nomes estão sendo renderizados no documento
    mockStore.data.favorites.forEach(({ name }) => {
      const heading = screen.getByRole('heading', {level: 2, name})
      expect(heading).toBeInTheDocument();
    })
  });

  it('Testar se aparece nenhum favorito', async () => {
    renderWithRouterAndRedux(<App />, {}, '/favorites');

    const notFound = screen.getByText('Nenhum Favorito');
    expect(notFound).toBeInTheDocument();
    
  });

  it('Ao favoritar um personagem se ele vai para o estado global aparece na tela', async () => {
    // renderiza a partir do App, acessa a rota /favorites e define um estado global inicial da aplicacao
    const { store } = renderWithRouterAndRedux(<App />, mockStore, '/favorites');

    //verifica se existe 2 botoes com desfavoritar
    const btnDesfav = screen.getAllByRole('button', { name: /desfavoritar/i });
    expect(btnDesfav).toHaveLength(2);

    // captura os h2 para verificar se os cards estão lá
    const heading = screen.getAllByRole('heading', { level: 2 });
    
    // verifica se tem Pepe e Pete
    expect(heading[0]).toHaveTextContent('Pepe');
    expect(heading[1]).toHaveTextContent('Pete');
    
    // clicar remover todos os favoritos
    act(() => {
      userEvent.click(btnDesfav[0]);
      userEvent.click(btnDesfav[1]);
    })
    
    // verifica se o estado global está com favoritos vazio
    const newFavorites = store.getState().data.favorites;
    expect(newFavorites).toHaveLength(0);

    // verifica se ao apagar todos os favoritos aparece a mensagem de nenhum favorito
    const notFound = screen.getByText('Nenhum Favorito');
    expect(notFound).toBeInTheDocument();
  });
})