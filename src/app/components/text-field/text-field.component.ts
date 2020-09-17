import { Component, OnInit, Input, forwardRef, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
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
  ],
})
export class TextFieldComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator {
  @Input() uuid: string;
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() mandatory: boolean = false;
  @Input() errorMessage: string = "";

  text: FormControl;

  private _onTouched: () => void;
  private _onValidatorChange: () => void;
  private _changeSub: Subscription;
  private initialized: boolean = false;

  /*
  https://stackoverflow.com/questions/57186593/how-to-pass-ngcontrol-status-to-child-component-in-angular-implementing-control
  A tester, enlever le expressionhaschangedafteritwaschecked. On devrait pouvoir conserver les validator définis en haut et en rajouter un avec le number.

  */

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this._consoleLog("ngOnChanges", changes);
    // if (!this.initialized) return;
    if (changes.mandatory || changes.errorMessage) {
      this.text && this.text.updateValueAndValidity();
      // this._onValidatorChange && this._onValidatorChange();
    }
  }

  ngOnInit(): void {
    this.text = new FormControl(undefined, this._customValidator.bind(this));
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this._changeSub.unsubscribe();
  }

  blur() {
    console.log("text field blur");
    this._onTouched();
  }

  /* CONTROL VALUE ACCESSOR */

  writeValue(val: any) {
    this._consoleLog("writeValue", val);
    this.text.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    this._consoleLog("registerOnChange", fn);
    this._changeSub = this.text.valueChanges.subscribe((value: any) => {
      this._consoleLog("onChange", value);
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this._consoleLog("registerOnTouched", fn);
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this._consoleLog("setDisabledState", isDisabled);
    isDisabled ? this.text.disable() : this.text.enable();
  }

  /* VALIDATOR */

  validate(control: AbstractControl): ValidationErrors {
    this._consoleLog("validate", this.text.errors);
    return this.text.errors;
  }

  registerOnValidatorChange(fn : any) {
    this._onValidatorChange = ()=> {
      this._consoleLog("onValidatorChange");
      fn();
    };
  }

  private _customValidator(control: AbstractControl): ValidationErrors {
    let error: ValidationErrors = {};

    if (this.mandatory && !control.value) error.mandatory = true;
    if (this.errorMessage) error.custom = true;

    return error;
  }

  private _consoleLog(text: string, a?: any, b: any = " ", c: any = " ") {
    if (this.uuid) {
      console.log(this.uuid + ": " + text, a, b, c);
    }
  }
}
