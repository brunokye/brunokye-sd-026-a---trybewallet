import React, { Component } from 'react';
import '../styles/login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSuccess } from '../redux/actions';

class Login extends Component {
  state = {
    btnDisabled: true,
    email: '',
  };

  handleChange = ({ target }) => {
    const inputEmail = document.getElementById('input-email');
    const inputPassword = document.getElementById('input-password');

    // RegEx -> https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regEx = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const MIN_PASSWORD_SIZE = 6;
    const loginValidation = regEx.test(inputEmail.value)
      && inputPassword.value.length >= MIN_PASSWORD_SIZE
      ? this.setState({ btnDisabled: false })
      : this.setState({ btnDisabled: true });

    const { name, value } = target;
    this.setState({ [name]: value });

    return loginValidation;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(loginSuccess(email));
    history.push('/carteira');
  };

  render() {
    const { btnDisabled } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <form className="form-container">
          <input
            id="input-email"
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={ handleChange }
          />

          <input
            id="input-password"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={ handleChange }
          />

          <button
            type="submit"
            disabled={ btnDisabled }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
