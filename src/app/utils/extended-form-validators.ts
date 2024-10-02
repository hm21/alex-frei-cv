import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ExtendedValidators {
  /**
   * Validator that checks if the control's value contains only whitespace or is empty.
   *
   * This validator ensures that a form control's value is required but cannot consist
   * of only whitespace. It trims the input and checks if the remaining value has any
   * non-whitespace characters. If the trimmed value is empty, the validator returns
   * a validation error.
   *
   * @returns A ValidatorFn that returns a validation error object if the input is only whitespace,
   *          or `null` if the input is valid.
   *
   * Validation error object structure:
   * - `{ whitespace: true }`: when the control value consists only of whitespace or is empty.
   *
   * Example:
   * ```typescript
   * this.form = this.fb.group({
   *   name: ['', [ExtendedValidators.requiredNonWhitespace]],
   * });
   * ```
   */
  static get requiredNonWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = !!String(control.value || '').trim();
      return isValid ? null : { requiredNonWhitespace: false };
    };
  }
  /**
   * Validator that checks whether the control's value is a valid email address.
   *
   * This validator uses a regular expression to validate whether the input follows the
   * standard email address format. It ensures that the control's value matches a pattern
   * resembling a valid email address structure (e.g., `example@domain.com`).
   *
   * @returns A ValidatorFn that returns a validation error object if the control's value is not a valid email,
   *          or `null` if the email is valid.
   *
   * Validation error object structure:
   * - `{ eMail: false }`: when the control value is not a valid email format.
   *
   * Example:
   * ```typescript
   * this.form = this.fb.group({
   *   email: ['', [Validators.required, ExtendedValidators.email]],
   * });
   * ```
   *
   * Regular Expression Details:
   * - Supports standard email formats such as `name@domain.com` or `user.name@sub.domain.com`.
   * - Allows the use of quoted local parts and IP address domain parts.
   *
   * Note:
   * - The regular expression used is a common and widely accepted pattern for validating most typical email addresses,
   *   though it might not cover every possible edge case.
   */
  static get email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = re.test(String(control.value ?? '').toLowerCase());
      return isValid ? null : { eMail: false };
    };
  }
}
