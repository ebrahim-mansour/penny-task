import { Store } from '@ngrx/store';
import { AppState } from './store';

export function initializeApp(store: Store<AppState>) {
  return () => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      const state = JSON.parse(storedState);
      store.dispatch({ type: '[Auth] Set State', payload: state.auth });
    }
  };
}
