import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loginSuccess$ = createEffect(
    (actions$ = inject(Actions)) =>
      actions$.pipe(ofType(AuthActions.loginSuccess)),
    { dispatch: false }
  );
}
