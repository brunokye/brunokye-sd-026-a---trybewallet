import getCurrencies from '../../services/Api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginSuccess = (email) => ({
  type: LOGIN_SUCCESS,
  payload: email,
});

export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  payload: currencies,
});

// export const newExpense = (expense) => ({
//   type: NEW_EXPENSE,
//   payload: expense,
// });

export const newExpense = async (dispatch, expense) => {
  const exchangeRates = await getCurrencies();

  dispatch({
    type: NEW_EXPENSE,
    payload: {
      ...expense,
      exchangeRates,
    },
  });
};

export const deleteExpense = async (dispatch, expense) => {
  dispatch({
    type: DELETE_EXPENSE,
    payload: expense,
  });
};

export const fetchCurrencies = () => async (dispatch) => {
  const data = await getCurrencies();

  // const filterData = Object.keys(data).filter((currency) => currency !== 'USDT');
  delete data.USDT;

  dispatch(requestCurrencies(data));
};
