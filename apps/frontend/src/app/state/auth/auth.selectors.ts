import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);

export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.username
);
