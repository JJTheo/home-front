import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, ValidatorFn } from '@angular/forms';
import { Injector, Input, OnInit } from '@angular/core';
import { ErrorMessageService } from './services/error-message.service';

export abstract class CVAConnector implements ControlValueAccessor, OnInit {
  // Form Control Validation
  @Input() private formControl: FormControl;
  @Input() private formControlName: string;

  control: FormControl;

  protected _onTouched = () => { };
  protected _onChange = (value: any) => { };

  constructor(private injector: Injector, private errorService: ErrorMessageService) {
  }

  ngOnInit(): void {
    if (this.formControl) {
      this.control = this.formControl;
    }
    else if (this.formControlName) {
      let controlContainer: ControlContainer = this.injector.get(ControlContainer);
      if (controlContainer) {
        this.control = controlContainer.control.get(this.formControlName) as FormControl;
      } else {
        console.error("ControlContainer is null but a formControlName is specified. This should not happen");
        this.control = null;
      }
    } else {
      console.log("no formControl, replaced by empty formcontrol");
      this.control = new FormControl();
    }
  }

  blur() {
    console.log("blur");
    this._onTouched();
  }

  getErrorMessage(): string {
    return this.control.touched ? this.errorService.getErrorMessage(this.control.errors) : undefined;
  }

  getLabel(label: string): string {
    return this.hasRequiredValidator(this.control) ? "* " + label : label;
  }

  addValidator(validator: ValidatorFn) {
    this.control.setValidators(this.control.validator ? [this.control.validator, validator] : validator);
  }

  /* CONTROL VALUE ACCESSOR IMPL */

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  abstract writeValue(val: any): void;
  abstract setDisabledState(isDisabled: boolean): void;

  /* https://stackoverflow.com/a/47010307 */
  private hasRequiredValidator(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }
}
