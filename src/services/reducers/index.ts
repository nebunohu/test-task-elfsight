import { combineReducers } from "redux";
import { charactersReducer } from "./characters";


export const rootReducer = combineReducers({
  characters: charactersReducer
});