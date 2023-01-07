import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

describe('Testa a Página "Login"', () => {
  it('1 - Verifica os elementos da tela.', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('2 - Testa os verificadores de email e senha', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/digite sua senha/i);
    const button = screen.getByRole('button');

    userEvent.type(email, 'test@gmail.com');
    userEvent.type(password, '1234567890');

    expect(button).toBeEnabled();
  });
});

describe('Testa a página "Wallet"', () => {
  it('1 - Verifica os elementos da tela.', () => {
    renderWithRouterAndRedux(<Wallet />);

    // const email = screen.getByTestId('email-field');
    // const totalExpense = screen.getByText(/0\.00/i);
    // const currency = screen.getByText(/brl/i);

    // expect(email).toBeInTheDocument();
    // expect(totalExpense).toBeInTheDocument();
    // expect(currency).toBeInTheDocument();

    // const value = screen.getByRole('spinbutton');
    // const expenseCurrency = screen.getByTestId('currency-input');
    // const method = screen.getByTestId('method-input');
    // const tag = screen.getByTestId('tag-input');
    // const description = screen.getByRole('textbox');
    // const button = screen.getByRole('button');

    // expect(value).toBeInTheDocument();
    // expect(expenseCurrency).toBeInTheDocument();
    // expect(method).toBeInTheDocument();
    // expect(tag).toBeInTheDocument();
    // expect(description).toBeInTheDocument();
    // expect(button).toBeInTheDocument();
  });
});
