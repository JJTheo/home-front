import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hf-number-field2',
  templateUrl: './number-field2.component.html',
  styleUrls: ['./number-field2.component.css']
})
export class NumberField2Component implements OnInit, AfterViewInit, DoCheck {
  @Input() fc: FormControl;

  number: FormControl;

  @Output() hfBlur = new EventEmitter<any>();


  constructor() { }

  ngDoCheck(): void {
  //   if (this.number.touched) {
  //     this.fc.markAsTouched();
  //     this.fc.updateValueAndValidity();
  //   }
  }
  
  ngOnInit(): void {
    this.number = new FormControl('', this.fc.validator);
    this.number.valueChanges.subscribe((val:any)=> {
      console.log("valueChanges", val);
      if (val)
        this.fc.setValue(+val);
        else 
        this.fc.setValue('');
    })
    this.fc.statusChanges.subscribe((val:any)=> {
      console.log("statusChanges", val);

      if (this.number.enabled && val === 'DISABLED')  {
        console.log("disable");
        this.number.disable();
      }
      if (val !== 'DISABLED'&&this.number.disabled)  {
        console.log("enable");
        this.number.enable();
      }
    })
  }

  onBlur() {
    this.fc.markAsTouched();
    this.hfBlur.emit();
  }



  ngAfterViewInit(): void {
    
  }

}
