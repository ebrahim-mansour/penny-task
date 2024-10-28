import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, timer } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private router: Router) {}

  loginSuccess$ = createEffect((actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map((action) => {
        const expirationDate = new Date(Date.now() + action.expirationTime); // expirationTime in ms
        console.log(`🚀 ~ file: auth.effects.ts:16 ~ AuthEffects ~ map ~ expirationDate:`, expirationDate)
        return AuthActions.setTokenExpiration({ expirationDate });
      })
    )
  );

  autoLogout$ = createEffect((actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthActions.setTokenExpiration),
      switchMap(({ expirationDate }) => {
        const delayDuration = expirationDate.getTime() - Date.now();
        return timer(delayDuration).pipe(map(() => AuthActions.logout()));
      })
    )
  );

  logout$ = createEffect(
    (actions$ = inject(Actions)) =>
      actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          const cookies = document.cookie.split(';');
          for (const cookie of cookies) {
            const cookieName = cookie.split('=')[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          }
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
