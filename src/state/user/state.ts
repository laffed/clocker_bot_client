type UserState = {
  authorized: boolean;
  clockStatus: 'in' | 'out' | 'unknown';
  loading: boolean;
  loadingMsg: string;
}

export const state: UserState = {
  authorized: false,
  loading: false,
  clockStatus: 'unknown',
  loadingMsg: '... Lift Off!!!'
}