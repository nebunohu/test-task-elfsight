import { TCharactersActions } from './../services/actions/characters-actions';
import { store } from '../index';
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TAppStateActions } from '../services/actions/app-actions';

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TCharactersActions | TAppStateActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 