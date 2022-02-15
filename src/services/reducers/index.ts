import { appReducer } from './app';
import { combineReducers } from "redux";
import { charactersReducer } from "./characters";


export const rootReducer = combineReducers({
  app: appReducer,
  characters: charactersReducer
});