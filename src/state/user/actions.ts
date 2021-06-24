import React from 'react'
import {AsyncAction} from '@state';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ENV} from 'env';


export const checkLocalLogin: AsyncAction<void, boolean> = async ({state}) => {
  return true;
}

export const loginFirebase: AsyncAction<{email: string; pw: string}, any> = async ({state}, {email, pw}) => {
  try {
    const tryLogin = await auth().signInWithEmailAndPassword(email, pw);
    if (tryLogin.additionalUserInfo) {
      state.User.authorized = true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const logout: AsyncAction<void, boolean> = async ({state}) => {
  return true;
}

export const checkStatus: AsyncAction<void, void> = async ({state}) => {
  const res = await axios({
    method: 'get',
    url: ENV.karen_routes.status
  });
  if (res.data?.success) {
    state.User.clockStatus = res.data.status === 'in';
  }
}

export const doClockEvent: AsyncAction<void, void> = async ({state}) => {
  const res = await axios({
    method: 'get',
    url: ENV.karen_routes.clocker
  });
  if (res.data?.success) {
    state.User.clockStatus = res.data.status === 'in';
  }
}