import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import { AbstractControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CVAConnector } from 'src/app/c-v-a-connector';
import { ErrorMessageService } from 'src/app/services/error-message.service';

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
export class TextField3Component extends CVAConnector implements OnInit {
  @Input() label: string = "";
  @Input() readonly: boolean = false;
  @Input() hideErrorMessage: boolean = false;

  internalValue: string;
  disabled: boolean = false;

  constructor(injector: Injector, errorService: ErrorMessageService) {
    super(injector, errorService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    let custom42Validator = (control: AbstractControl) => {
      let val = control.value;
      if (val == "42")
        return { custom42: true };
      return null;
    };

    // Test ajout validator interne ca marche, les erreurs remontent bien
    // TODO Ca marche juste pas si a l'initialisation, la valeur est deja invalide (voir showcase ngAfterViewInit)
    this.addValidator(custom42Validator);
  }

  inputChange(val: any) {
    console.log("input change", val);
    this._onChange(val);
    this._onTouched();
  }

  writeValue(val: any): void {
    console.log("writeValue " + this.label, val);
    this.internalValue = val;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log("setDisabledState");
    this.disabled = isDisabled;
  }
}
