import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

// Define a meta-reducer to sync the state
export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['auth'], // Specify which part of the state to sync
    rehydrate: true,
  })(reducer);
}

// Add the meta-reducer to your module
export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
