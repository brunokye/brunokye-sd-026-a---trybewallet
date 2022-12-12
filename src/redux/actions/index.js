import getCurrencies from '../../services/Api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const loginSuccess = (email) => ({
  type: LOGIN_SUCCESS,
  payload: email,
});

export const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await getCurrencies();
  const filterData = Object.keys(data).filter((currency) => currency !== 'USDT');

  dispatch(requestCurrencies(filterData));
};
