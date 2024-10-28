import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    this.store.subscribe((state) => {
      localStorage.setItem('appState', JSON.stringify(state));
    });
  }
}
