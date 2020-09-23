import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CVAConnector } from 'src/app/c-v-a-connector';
import { NumberPipe } from 'src/app/pipes/number.pipe';
import { ErrorMessageService } from 'src/app/services/error-message.service';

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
export class NumberField3Component extends CVAConnector implements OnInit {
  @Input() label: string = "";
  @Input() readonly: boolean = false;
  @Input() hideErrorMessage: boolean = false;

  internalValue: string;
  disabled: boolean = false;

  private numberPipe: NumberPipe;

  constructor(injector: Injector, errorService: ErrorMessageService) {
    super(injector, errorService);
    this.numberPipe = new NumberPipe();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  inputChange(val: any) {
    console.log("input change", val);
    let number = this.numberPipe.transform(val);
    this._onChange(number);
    this._onTouched();
  }

  writeValue(val: any): void {
    console.log("writeValue", val);
    this.internalValue = val as string;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log("setDisabledState");
    this.disabled = isDisabled;
  }
}