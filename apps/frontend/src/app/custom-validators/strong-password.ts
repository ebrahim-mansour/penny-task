import { AbstractControl, ValidationErrors } from '@angular/forms';

// Strong Password Validator
export function strongPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value || '';
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isValid =
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar &&
    value.length >= 8;

  return isValid ? null : { strongPassword: true };
}
