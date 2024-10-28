import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { strongPasswordValidator } from '../../custom-validators/strong-password';
import { emailPattern } from '../../utils/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [null],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), strongPasswordValidator],
      ],
    });
  }

  onSignup() {
    const formData = { ...this.signupForm.value };

    // Replace empty strings with null
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        formData[key] = null;
      }
    });

    this.authService.signup(formData).subscribe(
      (response) => {
        if (response.status === 201) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        if (error.status === 422) {
          this.snackBar.open('Email already exists!', 'Close', {
            duration: 3000,
          });
        }
      }
    );
  }
}
