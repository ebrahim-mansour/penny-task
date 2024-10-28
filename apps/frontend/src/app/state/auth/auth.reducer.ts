import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state.model';

export const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  tokenExpirationDate: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isLoggedIn: true,
    username,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    username: null,
    tokenExpirationDate: null,
  })),
  on(AuthActions.setTokenExpiration, (state, { expirationDate }) => ({
    ...state,
    tokenExpirationDate: expirationDate,
  }))
);
