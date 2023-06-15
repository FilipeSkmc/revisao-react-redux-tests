/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { mockFetch } from './helpers/mock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Menu', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetch)
    })
  })

  afterEach(() => {
    global.fetch.mockClear();
  })
  
  it('Testar se os cards estão na tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />, {}, '/menu');
    // verifica o loading
    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();
    // espera o loading sair da tela
    await waitForElementToBeRemoved(loading);

    // verifica se houve a requisicao a api
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith("https://bobsburgers-api.herokuapp.com/characters/?limit=20&skip=387");

    // verificar o estado global dentro de data -> characters
    expect(store.getState().data.characters).toHaveLength(20);
    expect(store.getState().data.characters).toEqual(mockFetch);

    // verifica se existe 20 h2 com nomes
    const headings = screen.getAllByRole('heading', {level: 2});
    expect(headings).toHaveLength(20);

    // verifica se cada um dos nomes estão sendo renderizados no documento
    mockFetch.forEach(({ name }) => {
      const heading = screen.getByRole('heading', {level: 2, name})
      expect(heading).toBeInTheDocument();
    })
  });

  it('Ao favoritar um personagem se ele vai para o estado global aparece na tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />, {}, '/menu');
    // verifica o loading
    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();
    // espera o loading sair da tela
    await waitForElementToBeRemoved(loading);

    // clicar em 2 buttons para favoritar
    const btnFavs = screen.getAllByRole('button');
    act(() => {
      userEvent.click(btnFavs[0]);
      userEvent.click(btnFavs[1]);
    })

    //verifica se existe 2 botoes com desfavoritar
    const btnDesfav = screen.getAllByRole('button', { name: /desfavoritar/i });
    expect(btnDesfav).toHaveLength(2);

    // acessa o estado global no array de favoritos
    const favorites = store.getState().data.favorites;
    expect(favorites).toHaveLength(2);
    
    // verifica se tem Pepe e Pete
    expect(favorites[0].name).toEqual('Pepe');
    expect(favorites[1].name).toEqual('Pete');
    
    // clicar em um botao de desfavoritar
    act(() => {
      userEvent.click(btnDesfav[0]);
    })

    const newFavorites = store.getState().data.favorites;
    expect(newFavorites).toHaveLength(1);
    expect(newFavorites[0].name).toEqual('Pete');
  });
})