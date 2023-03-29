import { Injectable } from '@angular/core';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { Validator } from 'src/app/models/validation/validator.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public setValidator(error: ErrorResponse | null, validators: Validator[]) {
    validators.forEach((item) => {
       item.message = '';
       item.state = 'is-valid'
     })
    if (error && error?.error?.errors) {
      let errors = Object.getOwnPropertyNames(error?.error?.errors);
      errors.forEach((item) => {
        let message = this.getMessage(item, error);
        let validator = validators.find((value) => this.findValidator(value, this.lowercaseFirstLetter(item)));
        if (message && validator) {
          validator.state = 'is-invalid';
          validator.message = message;
        }
      });
    }
  }

  private findValidator(validator: Validator, name: string) {
    return validator.name === name;
  }

  private getMessage(key: string, error: ErrorResponse | null) {
    return error?.error?.errors[key][0]
  }

  private lowercaseFirstLetter(str: string): string {
    return str.charAt(0).toLocaleLowerCase() + str.slice(1);
  }
}