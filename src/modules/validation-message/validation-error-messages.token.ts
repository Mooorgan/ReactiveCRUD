import { InjectionToken } from '@angular/core';

export const ERROR_MESSAGES: { [key: string]: (args?: any) => string } = {
  required: () => `This field is required`,
  requiredTrue: () => `This field is required`,
  email: () => `It should be a valid email`,
  minlength: ({ requiredLength }) =>
    `The length should be at least ${requiredLength} characters`,
  maxlength: ({ requiredLength }) =>
    `The length should be at most ${requiredLength} characters`,
  appPasswordShouldMatch: () => `Password should match`,
  passwordShouldMatch: () => `Password should match`,
  pattern: () => `Wrong format`,
  sonaNameValidator: () => `Give both first name and last name`,
  sonaPhoneNumberValidator: () => `Phone number should be exactly 10 numbers`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  `Validation Messages`,
  {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES,
  }
);
