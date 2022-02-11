import { getToken } from "../../utils/get-token";

export const SET_IS_AUTH = 'SET_IS_AUTH';
export const RESET_IS_AUTH = 'RESET_IS_AUTH';
export const SET_USERNAME = 'SET_USERNAME';
export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';

export const setIsAuth = () => {
  return {
    type: SET_IS_AUTH
  };
};

export const resetIsAuth = () => {
  return {
    type: RESET_IS_AUTH
  };
};

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    username,
  };
};

export const getTokenRequest = () => {
  return {
    type: GET_TOKEN_REQUEST
  };
};

export const getTokenSuccess = (username) => {
  return {
    type: GET_TOKEN_SUCCESS,
    username
  };
};

export const getTokenFailed = () => {
  return {
    type: GET_TOKEN_FAILED
  };
};

export const getTokenThunk = (url, username, password) => async (dispatch) => {
  dispatch(getTokenRequest());
  try {
    const response = await getToken(url, username, password)
    if(!response.ok) throw new Error('Token request failed')
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', username);
    dispatch(setIsAuth());
    dispatch(getTokenSuccess(username));
  } catch (error) {
    console.log(error);
    dispatch(getTokenFailed());
  }
};