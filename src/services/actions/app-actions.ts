export const SET_IS_MODAL_OPENED: 'SET_IS_MODAL_OPENED' = 'SET_IS_MODAL_OPENED';
export const CLEAR_IS_MODAL_OPENED: 'CLEAR_IS_MODAL_OPENED' = 'CLEAR_IS_MODAL_OPENED';

type TSetIsModalOpened = {
  readonly type: typeof SET_IS_MODAL_OPENED;
};

type TClearIsModalOpened = {
  readonly type: typeof CLEAR_IS_MODAL_OPENED;
};

export type TAppStateActions = TSetIsModalOpened | TClearIsModalOpened;

export const setIsModalOpened = () => {
  return {
    type: SET_IS_MODAL_OPENED
  };
};

export const clearIsModalOpened = () => {
  return {
    type: CLEAR_IS_MODAL_OPENED
  };
};

