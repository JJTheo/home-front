import { Component, DoCheck, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms";

@Component({
  selector: "hf-text-field3",
  templateUrl: "./text-field3.component.html",
  styleUrls: ["../../styles/base-input-styles.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField3Component),
      multi: true,
    },
  ],
})
export class TextField3Component implements OnInit, OnChanges, DoCheck, ControlValueAccessor {
  @Input() label: string = "";
  @Input() errorMessage: string;
  
  @Input() formControl: FormControl;

  valid: boolean;
  text: FormControl;

  _onTouched = () => {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onChanges", changes);
  }

  ngDoCheck(): void {
    this.formControl.touched && this.text.markAsTouched();
  }

  ngOnInit(): void {
    this.text = new FormControl(this.formControl.value, this.formControl.validator);
    this.formControl.statusChanges.subscribe((status: any) => {
      console.log("status changes", status);
    });
  }

  blur() {
    this._onTouched();
  }

  writeValue(val: any): void {
    console.log("writeValue");
    this.text.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log("registerOnChange");
    this.text.valueChanges.subscribe((value: any) => {
      console.log("onChange", value);
      fn(value);
    });
  }
  registerOnTouched(fn: any): void {
    this._onTouched = () => {
      console.log("touched");
      fn();
    };
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("setDisabledState");
  }

  validate(control: AbstractControl): ValidationErrors {
    console.log("validate");
    console.log(control.validator);
    return this.text.errors;
  }
  // registerOnValidatorChange?(fn: () => void): void {}
}
