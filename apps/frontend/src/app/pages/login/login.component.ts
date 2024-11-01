import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { strongPasswordValidator } from '../../custom-validators/strong-password';
import * as AuthActions from '../../state/auth/auth.actions';
import { emailPattern } from '../../utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), strongPasswordValidator],
      ],
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        if (response.status === 200) {
          const username =
            response.body.firstName +
            (response.body.lastName ? ' ' + response.body.lastName : '');
          this.store.dispatch(AuthActions.loginSuccess({ username, expirationTime: 8 * 60 * 60 * 1000 }));
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.snackBar.open('Invalid Credentials!', 'Close', {
            duration: 3000,
          });
        }
      }
    );
  }
}
