import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hf-text-field2',
  templateUrl: './text-field2.component.html',
  styleUrls: ['./text-field2.component.css']
})
export class TextField2Component implements OnChanges, OnInit, OnDestroy {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @Input() mandatory: boolean = false;
  @Input() errorMessage: string = "";
  @Input() fc: FormControl;

  @Output() hfBlur = new EventEmitter<any>();


  text: FormControl;


  constructor() {
    console.log("constructor");
    // this.control && (this.control.valueAccessor = this);
    // this.text = new FormControl(this.control.value);

  }

  ngOnInit(): void {
    this.text = new FormControl('', this.fc.validator);
    // setTimeout(() => {
    //   this.text.disable();
    // }, 1200);

    console.log("ngOnInit");
    this.text.valueChanges.subscribe((val:any)=> {
      console.log("valueChanges", val);
      this.fc.setValue(val);
    });
    this.fc.statusChanges.subscribe((val:any)=> {
      console.log("statusChanges", val);
      
      if (val === 'DISABLED'&&this.text.enabled)  {
        console.log("disable");
        this.text.disable({emitEvent:false});
      }
      if (val !== 'DISABLED'&&this.text.disabled)  {
        console.log("enable");
        this.text.enable({emitEvent:false});
      }
      // this.fc.setValue(val);
    });
  

    // this._changeSub = this.text.valueChanges.subscribe((value: any) => {
    //   this._consoleLog("onChange", value);
    //   this._onChange(value);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);
    // let error = { custom: true };
    // if (changes.errorMessage && changes.errorMessage.currentValue != '') {
    //   this.fc && this.fc.setErrors(error);
    //   this.parentFormControl && this.parentFormControl.setErrors(error);
    // }else {
    //   this.fc && this.fc.setErrors(null);
    //   this.parentFormControl && this.parentFormControl.setErrors(null);
    // }
    
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
    // this._changeSub.unsubscribe();
  }

  blur() {
    console.log("blur");
    this.fc.markAsTouched();
    this.hfBlur.emit();
    // this.fc.updateValueAndValidity();
    // this._onTouched();
  }

  /* CONTROL VALUE ACCESSOR */

  // writeValue(val: any) {
  //   this._consoleLog("writeValue", val);
  //   this.text.setValue(val, { emitEvent: false });
  // }

  // registerOnChange(fn: any) {
  //   this._consoleLog("registerOnChange");
  //   this._onChange = fn;
  // }

  // registerOnTouched(fn: any) {
  //   this._consoleLog("registerOnTouched");
  //   this._onTouched = fn;
  // }

  // setDisabledState(isDisabled: boolean) {
  //   this._consoleLog("setDisabledState", isDisabled);
  //   isDisabled ? this.text.disable() : this.text.enable();
  // }

}
