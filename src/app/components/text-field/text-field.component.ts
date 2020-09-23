import { Component, OnInit, Input, EventEmitter, forwardRef, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy, AfterContentChecked, AfterViewChecked, AfterContentInit, Output, ChangeDetectorRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

/*REGARDER https://stackblitz.com/edit/angular-nested-forms-cva?file=src%2Fapp%2Faddress-info%2Faddress-info.component.ts
  
  En sortie on a besoin de savoir sur l'état du champ: 
  - Savoir si le champ est invalide (formcontrol)
  - Savoir si le champ a été touché
  - Savoir quelle est la valeur courante / s'abonner aux nouvelles valeurs
  De l'extérieur, on a besoin:
  - D'envoyer un formControl
  - De mettre le chmp disable()
  - De mettre le champ required()
  - De checkValueAndValidity()
  - De changer la valeur avec setValue() sans renvoyer en haut
  - De mettre un message d'erreur personnalisé
   */

@Component({
  selector: "hf-text-field",
  templateUrl: "./text-field.component.html",
  styleUrls: ["./text-field.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ]
})
export class TextFieldComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator, AfterContentInit {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() mandatory: boolean = false;
  @Input() errorMessage: string = "";
  @Input() maskParam: any;

  @Output() onHfvc = new EventEmitter<any>();

  text: FormControl;

  private _onTouched: () => void;
  private _onValidatorChange: () => void;
  private _changeSub: Subscription;
  private initialized: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterContentInit(): void {
    console.log("After content init");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);
    // if (!this.initialized) return;
    if (changes.mandatory || changes.errorMessage) {
      console.log("ngOnChanges updateValueAndValidity()");

      // Update the validator and send modifications to top components
      this.text && this.text.updateValueAndValidity();
      this.onHfvc.emit();
      // this.text && this.cd.detectChanges();
      // this._onValidatorChange && this._onValidatorChange();
    }
  }

  ngOnInit(): void {
    console.log("ngoninit");
    this.text = new FormControl(undefined, this._customValidator.bind(this));
    // this.hfValidatorChange.emit();

  }

  ngOnDestroy(): void {
    this._changeSub.unsubscribe();
  }

  blur() {
    console.log("text field blur");
    this._onTouched();
    this.onHfvc.emit();
  }

  /* CONTROL VALUE ACCESSOR */

  writeValue(val: any) {
    console.log("writeValue", val);
    this.text.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    this._changeSub = this.text.valueChanges.subscribe((value: any) => {
      console.log("onChange", value);
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    console.log("setDisabledState", isDisabled);
    isDisabled ? this.text.disable() : this.text.enable();
  }

  /* VALIDATOR */

  validate(control: AbstractControl): ValidationErrors {
    console.log("validate", this.text.errors);
    return control.errors;
  }

  registerOnValidatorChange(fn: any) {
    console.log("registerOnValidatorChange");
    this._onValidatorChange = () => {
      console.log("onValidatorChange");
      fn();
    };
  }

  private _customValidator(control: AbstractControl): ValidationErrors {
    console.log(control.errors);
    console.log(this.text && this.text.errors);
    let error: ValidationErrors = {};

    if (this.mandatory && !control.value) error.mandatory = true;
    if (this.errorMessage) error.custom = true;
    console.log("error", error);



    return error.mandatory || error.custom ? error : null;
  }
}
