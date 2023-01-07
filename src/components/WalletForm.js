import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, newExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { id } = this.state;
    const newId = id + 1;

    // dispatch(newExpense(this.state));
    newExpense(dispatch, this.state);

    this.setState({
      id: newId,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="expense-container">
        <input
          data-testid="value-input"
          type="number"
          name="value"
          placeholder="Valor"
          value={ value }
          onChange={ handleChange }
        />

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ handleChange }
        >
          { currencies.map((currencyType) => (
            <option key={ currencyType } value={ currencyType }>{ currencyType }</option>
          ))}
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <input
          data-testid="description-input"
          type="text"
          name="description"
          placeholder="Descrição"
          value={ description }
          onChange={ handleChange }
        />

        <button
          type="submit"
          onClick={ handleSubmit }
        >
          Adicionar despesa
        </button>
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
