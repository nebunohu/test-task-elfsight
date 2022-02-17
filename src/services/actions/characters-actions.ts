import { TCharacter } from './../../types/character-type';
import { AppDispatch, AppThunk } from './../../types/index';
import { getCharacters } from "../../utils/get-characters";
import { API_BASE_URL } from "../../utils/url";

export const GET_CHARACTERS_REQUEST: 'GET_CHARACTERS_REQUEST' = 'GET_CHARACTERS_REQUEST';
export const GET_CHARACTERS_SUCCESS: 'GET_CHARACTERS_SUCCESS' = 'GET_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_FAILED: 'GET_CHARACTERS_FAILED' = 'GET_CHARACTERS_FAILED';
export const CLEAR_CHARACTERS: 'CLEAR_CHARACTERS' = 'CLEAR_CHARACTERS';
export const SET_CURRENT_CHARACTER: 'SET_CURRENT_CHARACTER' = 'SET_CURRENT_CHARACTER';
export const CLEAR_CURRENT_CHARACTER: 'CLEAR_CURRENT_CHARACTER' = 'CLEAR_CURRENT_CHARACTER';
export const SET_FILTERED_CHARACTERS_LIST: 'SET_FILTERED_CHARACTERS_LIST' = 'SET_FILTERED_CHARACTERS_LIST';

export type TGetCCharactersRequest ={
  readonly type: typeof GET_CHARACTERS_REQUEST;
}

export type TGetCCharactersSuccess ={
  readonly type: typeof GET_CHARACTERS_SUCCESS;
  readonly list: Array<TCharacter>;
}

export type TGetCCharactersFailed ={
  readonly type: typeof GET_CHARACTERS_FAILED;
}

export type TClearCharacters ={
  readonly type: typeof CLEAR_CHARACTERS;
}

export type TSetCurrentrCharacter ={
  readonly type: typeof SET_CURRENT_CHARACTER;
  readonly character: TCharacter;
}

export type TClearCurrentrCharacter ={
  readonly type: typeof CLEAR_CURRENT_CHARACTER;
}

export type TSetFilteredCharactersList ={
  readonly type: typeof SET_FILTERED_CHARACTERS_LIST;
  readonly filteredList: Array<TCharacter>;
}

export type TCharactersActions = TGetCCharactersRequest | TGetCCharactersSuccess | TGetCCharactersFailed | TClearCharacters | TSetCurrentrCharacter | TClearCurrentrCharacter | TSetFilteredCharactersList;

export const getCharactersRequest = (): TCharactersActions => {
  return {
    type: GET_CHARACTERS_REQUEST,
  };
};

export const getCharactersSuccess = (list: Array<TCharacter>): TCharactersActions => {
  return {
    type: GET_CHARACTERS_SUCCESS,
    list
  };
};

export const getCharactersFailed = (): TCharactersActions => {
  return {
    type: GET_CHARACTERS_FAILED,
  };
};

export const clearCharacters = (): TCharactersActions => {
  return {
    type: CLEAR_CHARACTERS,
  }
}

export const setCurrentCharacter = (character: TCharacter): TCharactersActions => {
  return {
    type: SET_CURRENT_CHARACTER,
    character
  }
}

export const clearCurrentCharacter = (): TCharactersActions => {
  return {
    type: CLEAR_CURRENT_CHARACTER,
  }
}

export const setFilteredCharactersList = (filteredList: Array<TCharacter>): TCharactersActions => {
  return {
    type: SET_FILTERED_CHARACTERS_LIST,
    filteredList,
  }
}

export const getCharactersThunk: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(getCharactersRequest());
  try{
    const data = await getCharacters(`${API_BASE_URL}/character`, [])
      //.then(response => response.json())
      //.then(data => data);
    dispatch(getCharactersSuccess(data));
  } catch(error) {
    console.log(error);
    dispatch(getCharactersFailed())
  }
  
}