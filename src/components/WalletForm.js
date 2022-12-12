import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div className="expense-container">
        <input
          type="number"
          data-testid="value-input"
          placeholder="Valor"
        />

        <select data-testid="currency-input" name="currencies">
          { currencies.map((currency) => (
            <option key={ currency } value={ currency }>{ currency }</option>
          ))}
        </select>

        <select data-testid="method-input" name="payment">
          <option value="dinheiro">Dinheiro</option>
          <option value="cartão de crédito">Cartão de crédito</option>
          <option value="cartão de débito">Cartão de débito</option>
        </select>

        <select data-testid="tag-input" name="category">
          <option value="alimentação">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saúde">Saúde</option>
        </select>

        <input
          type="text"
          data-testid="description-input"
          placeholder="Descrição"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
