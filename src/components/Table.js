import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/table.css';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, expenses } = this.props;
    const filterExpense = expenses.filter((expense) => expense.id !== id);

    deleteExpense(dispatch, filterExpense);
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;
    editExpense(dispatch, id);
  };

  render() {
    const { expenses } = this.props;
    const { handleEdit, handleDelete } = this;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({ id, description, tag, method,
            value, currency, exchangeRates }) => (
            (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ currency }</td>
                <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ Number(exchangeRates[currency].ask * value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td className="edit-delete">
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => handleEdit(id) }
                  >
                    Editar
                  </button>

                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => handleDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
