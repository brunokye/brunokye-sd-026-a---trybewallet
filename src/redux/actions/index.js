export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (email) => ({
  type: LOGIN_SUCCESS,
  payload: email,
});
