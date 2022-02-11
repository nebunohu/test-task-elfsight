import { combineReducers } from "redux";
import { authReducer } from "./auth-reducer";
import { charactersReducer } from "./characters";


export const rootReducer = combineReducers({
  characters: charactersReducer,
  auth: authReducer
});