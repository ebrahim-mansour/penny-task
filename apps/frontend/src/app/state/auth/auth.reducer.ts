import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isLoggedIn: true,
    username,
  })),
  on(AuthActions.logout, () => initialState)
);
