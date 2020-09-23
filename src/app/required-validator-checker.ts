import { AbstractControl, ValidationErrors } from "@angular/forms";

import * as hashSum from "hash-sum";

export class RequiredValidatorChecker {
  private cachedHash: string;
  private cachedHasRequiredField: boolean;

  /**
   * Check if the formControl has the required validator.
   * https://stackoverflow.com/a/47010307
   * Performance amelioration to prevent from calling the validator all the time
   * https://gist.github.com/jsdevtom/5589af349a395b37e699b67417ef025b
   * Replaced hashSum of control by hashSum of validator otherwise the control sum changes between angular's checks
   *
   * TODO CHECK PK CA APELLE DEUX FOIS C DE LA MERDE
   */
  public hasRequiredValidator(abstractControl: AbstractControl): boolean {
    const newHash = hashSum(abstractControl.validator);

    if (this.cachedHash !== newHash) {
      const validator = abstractControl.validator({} as AbstractControl);

      this.cachedHasRequiredField = validator && validator.required;
      this.cachedHash = newHash;
      console.log("Checked hasRequiredValidator", this.cachedHasRequiredField);
    }

    return this.cachedHasRequiredField;
  }
}
