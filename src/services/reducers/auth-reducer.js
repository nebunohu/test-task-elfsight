import { GET_TOKEN_FAILED, GET_TOKEN_REQUEST, GET_TOKEN_SUCCESS, RESET_IS_AUTH, SET_IS_AUTH, SET_USERNAME } from "../actions/auth-actions";

const initialState = {
  isAuth: false,
  username: '',

  getTokenRequest: false,
  getTokenSuccess: false,
  getTokenFailed: false,
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: true,
      }
    }
    case RESET_IS_AUTH: {
      return {
        ...state,
        isAuth: false,
        username: '',
      }
    }
    case SET_USERNAME: {
      return {
        ...state,
        username: action.username,
      }
    }
    case GET_TOKEN_REQUEST: {
      return {
        ...state,
        getTokenRequest: true,
        getTokenSuccess: false,
        getTokenFailed: false
      }
    }
    case GET_TOKEN_SUCCESS: {
      return {
        ...state,
        getTokenRequest: false,
        getTokenSuccess: true,
        username: action.username,
      }
    }
    case GET_TOKEN_FAILED: {
      return {
        ...state,
        getTokenRequest: false,
        getTokenFailed: true
      }
    }
    default: return state;
  }
};

