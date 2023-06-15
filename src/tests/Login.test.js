/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Login', () => {
  it('Testar se o login armazena detro do estado global e se a rota muda', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    
    // captura os campos na tela
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    
    const passInput = screen.getByPlaceholderText('Password');
    expect(passInput).toBeInTheDocument();
    
    const btn = screen.getByRole('button', { name: /Login/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();

    // insere valores nos campos
    act(() => {
      userEvent.type(emailInput, 'f@f.com');
      userEvent.type(passInput, '123321');
    });

    // verifica se o botao está habilitado
    expect(btn).toBeEnabled();

    // clica no botao
    act(() => {
      userEvent.click(btn);
    });

    // pega o valor dentro do estado global e verifica se está salvo
    const email = store.getState().personal.email;
    expect(email).toEqual('f@f.com');

    // verifica se a rota mudou
    expect(history.location.pathname).toEqual('/menu');
  });
})