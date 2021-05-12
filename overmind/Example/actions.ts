import {Action, AsyncAction} from '../index';

export const resetExampleState: Action<void, void> = ({state}) => {
  state.Example.email = '';
  state.Example.isLoggedIn = false;
};

export const setLogin: Action<string, void> = ({state}, email) => {
  state.Example.email = email;
  state.Example.isLoggedIn = true;
};
