import React from 'react'
import {AsyncAction} from '@state';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const checkLocalLogin: AsyncAction<void, boolean> = async ({state}) => {
  return true;
}

export const loginFirebase: AsyncAction<{email: string; pw: string}, any> = async ({state}, {email, pw}) => {
  const tryLogin = await auth().signInWithEmailAndPassword(email, pw);
  return tryLogin;
}

export const logout: AsyncAction<void, boolean> = async ({state}) => {
  return true;
}
