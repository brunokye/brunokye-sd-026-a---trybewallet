import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    return (
      <div className="header-container">
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          { expenses
            ? expenses.reduce((acc, { exchangeRates, currency, value }) => (
              Number(exchangeRates[currency].ask * value + acc)), 0).toFixed(2)
            : 0 }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
