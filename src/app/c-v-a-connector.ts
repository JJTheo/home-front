import { ControlContainer, ControlValueAccessor, FormControl } from '@angular/forms';
import { Injector, Input, OnInit } from '@angular/core';
import { ErrorMessageService } from './services/error-message.service';

export abstract class CVAConnector implements ControlValueAccessor, OnInit {
  @Input() private formControl: FormControl;
  @Input() private formControlName: string;

  control: FormControl;

  protected _onTouched = () => { };
  protected _onChange = (value: any) => { };

  constructor(private injector: Injector, private errorService: ErrorMessageService) {
  }

  ngOnInit(): void {
    console.log("onInit parent", this.formControl, this.formControlName);
    if (this.formControl) {
      console.log("formControl method");
      this.control = this.formControl;
    }
    else if (this.formControlName) {
      console.log("controlcontainer method");
      let controlContainer: ControlContainer = this.injector.get(ControlContainer);
      if (controlContainer) {
        this.control = controlContainer.control.get(this.formControlName) as FormControl;
      } else {
        console.error("ControlContainer is null but a formControlName is specified. TODO");
      }
    } else {
      console.log("no formControl");
    }
  }

  blur() {
    console.log("blur");
    this._onTouched();
  }

  getErrorMessage(): string {
    return this.control && this.errorService.getErrorMessage(this.control.errors);
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
}
