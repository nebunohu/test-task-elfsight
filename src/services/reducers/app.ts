import { SET_IS_MODAL_OPENED, setIsModalOpened, CLEAR_IS_MODAL_OPENED } from './../actions/app-actions';
import { TAppStateActions } from "../actions/app-actions";

type TState = {
  isModalOpened: boolean;
};

const initialState: TState = {
  isModalOpened: false
};

export const appReducer = (state = initialState, action: TAppStateActions) => {
  switch (action.type){
    case SET_IS_MODAL_OPENED: {
      return {
        ...state,
        isModalOpened: true,
      }
    }
    case CLEAR_IS_MODAL_OPENED: {
      return {
        ...state,
        isModalOpened: false,
      }
    }
    default: return state;
  }
}