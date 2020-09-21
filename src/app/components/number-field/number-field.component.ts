import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
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
  ]
})
export class NumberFieldComponent implements OnChanges, OnInit, OnDestroy, DoCheck, ControlValueAccessor, Validator, AfterContentChecked, AfterViewChecked, AfterViewInit {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() mandatory: boolean = false;
  @Input() errorMessage: string = "";
  @Input() min: number;
  @Input() max: number;

  @Output() onHfvc = new EventEmitter<any>();

  number: FormControl;

  private _onChange: (val: any) => void;
  private _onTouched: () => void;
  private _onValidatorChange: () => void;
  private _changeSub: Subscription;

  constructor(private changeDetect: ChangeDetectorRef) { }
  
  
  ngAfterViewInit(): void {
    // this.number.updateValueAndValidity();
    // this._onValidatorChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);
    // this.number && this.number.updateValueAndValidity();
    this._onValidatorChange && this._onValidatorChange();
  }

  ngOnInit(): void {
    console.log("mandatory", this.mandatory);
    if (this.min) {
      this.number = new FormControl("", [Validators.min(this.min), Validators.max(this.max)]);
    }else {
      this.number = new FormControl("");
    }

    this._changeSub = this.number.valueChanges.subscribe((value: any) => {
      console.log("changed", value);
      this._onChange(+value);
    });
  }
  ngDoCheck(): void {
    console.log("doCheck");
    // if (this.number.touched) {
    //   this._onTouched();
    //   this.onHfvc.emit();
    // }
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked");
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked");
    // this._onValidatorChange();
  }

  ngOnDestroy(): void {
    this._changeSub.unsubscribe();
  }

  hfvc() {
    if (this.number.touched)
      this._onTouched();
    this.onHfvc.emit();
  }

  /* CONTROL VALUE ACCESSOR */

  writeValue(val: any) {
    console.log("writeValue", val);

    // val == 4 && this.number.setValue(val, { emitEvent: false });
    this.number.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any) {
    console.log("registerOnChange");
    this._onChange = fn;
  }
  registerOnTouched(fn: any) {
    console.log("registerOnTouched");
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    console.log("setDisabledState", isDisabled);
    isDisabled ? this.number.disable() : this.number.enable();
  }

  getErrors() {
    return JSON.stringify(this.number.errors);
  }

  /* VALIDATOR */

  validate(control: AbstractControl): ValidationErrors {
    console.log("validate", this.number.errors);
    console.log("validate", control.errors);

    return this.number.errors;
  }

  registerOnValidatorChange(fn: any) {
    this._onValidatorChange = () => {
      console.log("onValidatorChange");
      fn();
    };
  }
}
