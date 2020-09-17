import { AfterViewChecked, ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "hf-number-field",
  templateUrl: "./number-field.component.html",
  styleUrls: ["./number-field.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberFieldComponent),
      multi: true,
    },
  ],
})
export class NumberFieldComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator, AfterViewChecked {
  @Input() uuid: string;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() mandatory: boolean = false;
  @Input() errorMessage: string = "";

  number: FormControl;

  private _onChange: (val: any) => void;
  private _onTouched: () => void;
  private _onValidatorChange: () => void;
  private _changeSub: Subscription;

  constructor(private changeDetect: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.consoleLog("ngOnChanges", changes);
    this.number && this.number.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.consoleLog("mandatory", this.mandatory);
    this.number = new FormControl("");

    this._changeSub = this.number.valueChanges.subscribe((value: any) => {
      this.consoleLog("changed", value);
      this._onChange(+value);
    });
  }

  ngOnDestroy(): void {
    this._changeSub.unsubscribe();
  }

  blur() {
    console.log("number blue");
    this._onTouched();
  }

  /* CONTROL VALUE ACCESSOR */

  writeValue(val: any) {
    this.consoleLog("writeValue", val);

    // val == 4 && this.number.setValue(val, { emitEvent: false });
    this.number.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any) {
    this.consoleLog("registerOnChange", fn);
    this._onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.consoleLog("registerOnTouched", fn);
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.consoleLog("setDisabledState", isDisabled);
    isDisabled ? this.number.disable() : this.number.enable();
  }

  /* VALIDATOR */

  validate(control: AbstractControl): ValidationErrors {
    this.consoleLog("validate", this.number.errors);
    
    return this.number.errors;
  }
  
  registerOnValidatorChange(fn : any) {
    this._onValidatorChange = ()=> {
      this.consoleLog("onValidatorChange");
      fn();
    };
  }

  consoleLog(text: string, a?: any, b: any = " ", c: any = " ") {
    if (this.uuid) {
      console.log(this.uuid + ": " + text, a, b, c);
    }
  }
}
