import React from 'react'
import {AsyncAction, Action} from '@state';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ENV} from 'env';
import {act} from 'react-test-renderer';

const getAsyncStorage = async (): Promise<{user: string; pw: string, success: boolean}> => {
  try {
    const u = await AsyncStorage.getItem('@user');
    const p = await AsyncStorage.getItem('@pw');

    if (u === null || p === null) return {user: '', pw: '', success: false};

    return {user: u, pw: p, success: true}
  } catch (e) {
    return {user: '', pw: '', success: false};
  }
}

export const checkLocalLogin: AsyncAction<void, void> = async ({state}) => {
  state.User.loadingMsg = '';
  state.User.loading = true;
  if ((await getAsyncStorage()).success !== false) {
    state.User.authorized = true;
  }
  state.User.loading = false;
  state.User.loadingMsg = '... Lift off!'
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

export const logout: AsyncAction<void, boolean> = async ({state, actions}) => {
  await AsyncStorage.multiRemove(['@user', '@pw']);
  actions.User.resetUserState();
  return true;
}

export const login: AsyncAction<{user: string; pw: string}, boolean> = async ({state}, {user, pw}) => {
  state.User.loading = true;
  try {
    const res = await axios({
      method: 'POST',
      url: ENV.karen_routes.login,
      data: {
        apiKey: ENV.karen_api_key,
        user,
        pw
      }
    });

    if (!res?.data.success) {
      state.User.loading = false;
      return false;
    }

    await AsyncStorage.multiSet([['@user', user], ['@pw', pw]]);
    state.User.authorized = true;
    state.User.loading = false;
    return true;

  } catch (e) {
    console.log(e);
    state.User.loading = false;
    return false;
  }
}

export const checkStatus: AsyncAction<void, void> = async ({state}) => {
  state.User.loadingMsg = '... Pinging Karen';
  state.User.loading = true;
  const local = await getAsyncStorage();
  const res = await axios({
    method: 'POST',
    url: ENV.karen_routes.status,
    data: {
      apiKey: ENV.karen_api_key,
      user: local.user,
      pw: local.pw
    }
  });
  if (res.data?.success) {
    state.User.clockStatus = res.data.status;
  } else {
    state.User.clockStatus = 'unknown';
  }
  state.User.loading = false;
  state.User.loadingMsg = '... Lift off!';
}

export const doClockEvent: AsyncAction<void, void> = async ({state}) => {
  const message = state.User.clockStatus === 'in' ? '... Clocking out' : state.User.clockStatus === 'out' ? '... Clocking in' : '... Checking'
  state.User.loadingMsg = message;
  state.User.loading = true;
  const local = await getAsyncStorage();
  const res = await axios({
    method: 'POST',
    url: ENV.karen_routes.clocker,
    data: {
      apiKey: ENV.karen_api_key,
      user: local.user,
      pw: local.pw
    }
  });
  if (res.data?.success) {
    state.User.clockStatus = res.data.status;
  } else {
    state.User.clockStatus = 'unknown';
  }
  state.User.loading = false;
  state.User.loadingMsg = '... Lift off!';
}

export const resetUserState: Action<void, void> = ({state}) => {
  state.User = {
    authorized: false,
    loading: false,
    clockStatus: 'unknown',
    loadingMsg: '... Lift off!'
  }
}