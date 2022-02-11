import { CLEAR_CHARACTERS, GET_CHARACTERS_FAILED, GET_CHARACTERS_REQUEST, GET_CHARACTERS_SUCCESS } from "../actions/characters-actions";

const initialState = {
  info: {},
  list: [],

  getCharactersRequest: false,
  getCharactersSuccess: false,
  getCharactersFailed: false,
};

export const charactersReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHARACTERS_REQUEST: {
      return {
        ...state,
        getCharactersRequest: true,
        getCharactersSuccess: false,
        getCharactersFailed: false,
      }
    }
    case GET_CHARACTERS_SUCCESS: {
      return {
        ...state,
        getCharactersRequest: false,
        getCharactersSuccess: true,
        info: action.info,
        list: action.list
      }
    }
    case GET_CHARACTERS_FAILED: {
      return {
        ...state,
        getCharactersRequest: false,
        getCharactersFailed: true,
      }
    }
    case CLEAR_CHARACTERS: {
      return {
        ...state,
        list: [],
        info: {}
      }
    }
    default: return state;
  }
}