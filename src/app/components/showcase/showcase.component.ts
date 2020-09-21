import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"],
})
export class ShowcaseComponent implements OnInit, AfterViewInit {
  errorMessage: string = "";
  text: string;
  number: number;
  textFc: FormControl;
  numFc: FormControl;

  formGroup: FormGroup;

  constructor(private changeDetect: ChangeDetectorRef, private fb: FormBuilder) {
    this.textFc = new FormControl();
    this.numFc = new FormControl("");

    this.formGroup = this.fb.group({
      number: [null, [Validators.required, Validators.min(3)]],
      text: [null, Validators.required],
    });
    console.log(this.formGroup);
    setTimeout(() => {
      console.log("markAsTouched");
      this.formGroup.controls.text.updateValueAndValidity();
    }, 1000);
    // setTimeout(() => {
    //   console.log("enable");
    //   this.numFc.enable();
    // }, 2000);
  }

  getFormValidationErrors(form: FormGroup | FormArray): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors =
        control instanceof FormGroup || control instanceof FormArray
          ? this.getFormValidationErrors(control)
          : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any });
    return hasError ? result : null;
  }

  hfvc() {
    console.log("valchange");
    // this.changeDetect.detectChanges();
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    // this.changeDetect.detectChanges();
    // this.numFc.statusChanges.subscribe((val: any) => {
    //   console.log("status changes", val);
    // });
    this.numFc.valueChanges.subscribe((val: any) => {
      console.log("value changes", val);
    });
    // console.log("updateValueAndValidity");
    // this.numFc.updateValueAndValidity();

    // this.changeDetect.detectChanges();

    // this.numFc.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.numFc.statusChanges.subscribe((val: any) => {
      console.log("status changes", val);
      // this.changeDetect.detectChanges();
    });
  }

  randomErrMsg() {
    this.errorMessage = JSON.stringify(Math.random() * 100);
    // this.numFc.updateValueAndValidity();
    // this.changeDetect.detectChanges();
  }

  resetErrMsg() {
    this.errorMessage = "";
    // this.numFc.updateValueAndValidity();
    // this.changeDetect.detectChanges();
  }
}
