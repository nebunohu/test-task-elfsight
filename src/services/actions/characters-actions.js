import { getCharacters } from "../../utils/get-characters";
import { API_BASE_URL } from "../../utils/url";

export const GET_CHARACTERS_REQUEST = 'GET_CHARACTERS_REQUEST';
export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_FAILED = 'GET_CHARACTERS_FAILED';
export const CLEAR_CHARACTERS = 'CLEAR_CHARACTERS';

export const getCharactersRequest = () => {
  return {
    type: GET_CHARACTERS_REQUEST,
  };
};

export const getCharactersSuccess = (data) => {
  return {
    type: GET_CHARACTERS_SUCCESS,
    info: data.info,
    list: data.results
  };
};

export const getCharactersFailed = () => {
  return {
    type: GET_CHARACTERS_FAILED,
  };
};

export const clearCharacters = () => {
  return {
    type: CLEAR_CHARACTERS,
  }
}

export const getCharactersThunk = () => async (dispatch) => {
  dispatch(getCharactersRequest());
  try{
    const data = await getCharacters(`${API_BASE_URL}/character`)
      .then(response => response.json())
      .then(data => data);
    dispatch(getCharactersSuccess(data));
  } catch(error) {
    console.log(error);
    dispatch(getCharactersFailed())
  }
  
}