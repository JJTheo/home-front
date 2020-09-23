import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private unknownErrorsWarned: string[];

  constructor() {
    this.unknownErrorsWarned = [];
  }

  getErrorMessage(errors: ValidationErrors): string {
    if (!errors) return '';

    // Add custom errors here
    if (errors.required) {
      return 'Mandatory';
    } else if (errors.min) {
      return 'Minimum value exceeded';
    } else if (errors.max) {
      return 'Maximum value exceeded';
    } else {
      this.warnUnknownError(errors);
      return 'Invalid';
    }
  }

  /* Display a warning when an unknown error is encountered. Only once */
  warnUnknownError(errors: ValidationErrors) {
    let errorKeys: string[] = Object.keys(errors);
    for (let i in errorKeys) {
      let key = errorKeys[i]
      if (this.unknownErrorsWarned.indexOf(key) < 0) {
        this.unknownErrorsWarned.push(key);
        console.warn(`The error ${key} is not recognized by Naval Front. 'Invalid' will be displayed for this error`);
      }
    }
  }
}
