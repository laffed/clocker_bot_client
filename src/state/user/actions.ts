import {AsyncAction} from '@state';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLocalLogin: AsyncAction<void, boolean> = async ({state}) => {

  return true;
}

export const logout: AsyncAction<void, boolean> = async ({state}) => {
  return true;
}
