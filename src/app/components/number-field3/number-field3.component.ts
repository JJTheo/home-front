import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "hf-number-field3",
  templateUrl: "./number-field3.component.html",
  styleUrls: ["../../styles/base-input-styles.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberField3Component),
      multi: true,
    },
  ],
})
export class NumberField3Component implements OnInit, ControlValueAccessor {
  @Input() label: string = "";

  number: FormControl;

  _onTouched = () => {};

  constructor() {
    this.number = new FormControl("");
  }

  ngOnInit(): void {}

  blur() {
    this._onTouched();
  }
  writeValue(val: any): void {
    console.log("writeValue");
    this.number && this.number.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log("registerOnChange");
    this.number.valueChanges.subscribe((value: any) => {
      console.log("onChange", value);
      fn(value);
    });
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("setDisabledState");
  }

  /*
  On a besoin d'avoir les validateurs MIN & MAX (définis hors du comp)
  Convertisseur de valeur en nombre, 

  */
}
