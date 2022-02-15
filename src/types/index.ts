import { TCharactersActions } from './../services/actions/characters-actions';
import { store } from '../index';
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TCharactersActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 