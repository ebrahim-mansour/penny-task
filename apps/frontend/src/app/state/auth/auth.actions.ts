import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string; expirationTime: number }>()
);

export const logout = createAction('[Auth] Logout');

export const setTokenExpiration = createAction(
  '[Auth] Set Token Expiration',
  props<{ expirationDate: Date }>()
);
