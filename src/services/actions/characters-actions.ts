import { AppDispatch, AppThunk } from './../../types/index';
import { getCharacters } from "../../utils/get-characters";
import { API_BASE_URL } from "../../utils/url";

export const GET_CHARACTERS_REQUEST: 'GET_CHARACTERS_REQUEST' = 'GET_CHARACTERS_REQUEST';
export const GET_CHARACTERS_SUCCESS: 'GET_CHARACTERS_SUCCESS' = 'GET_CHARACTERS_SUCCESS';
export const GET_CHARACTERS_FAILED: 'GET_CHARACTERS_FAILED' = 'GET_CHARACTERS_FAILED';
export const CLEAR_CHARACTERS: 'CLEAR_CHARACTERS' = 'CLEAR_CHARACTERS';

export type TGetCCharactersRequest ={
  readonly type: typeof GET_CHARACTERS_REQUEST;
}

export type TGetCCharactersSuccess ={
  readonly type: typeof GET_CHARACTERS_SUCCESS;
  readonly list: any;
}

export type TGetCCharactersFailed ={
  readonly type: typeof GET_CHARACTERS_FAILED;
}

export type TClearCharacters ={
  readonly type: typeof CLEAR_CHARACTERS;
}

export type TCharactersActions = TGetCCharactersRequest | TGetCCharactersSuccess | TGetCCharactersFailed | TClearCharacters;

export const getCharactersRequest = (): TCharactersActions => {
  return {
    type: GET_CHARACTERS_REQUEST,
  };
};

export const getCharactersSuccess = (data: any): TCharactersActions => {
  return {
    type: GET_CHARACTERS_SUCCESS,
    //info: data.info,
    list: data//.results
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