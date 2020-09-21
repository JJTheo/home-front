import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"],
})
export class ShowcaseComponent implements OnInit , AfterViewInit{
  errorMessage: string = "";
  text: string;
  number: number;
  textFc: FormControl;
  numFc: FormControl;

  constructor(private changeDetect: ChangeDetectorRef) {
    this.textFc = new FormControl();
    this.numFc = new FormControl('');
    // setTimeout(() => {
    //   console.log("disable");
    //   this.numFc.disable();
    //   this.numFc.setValue(null);
    // }, 1000);
    // setTimeout(() => {
    //   console.log("enable");
    //   this.numFc.enable();
    // }, 2000);
  }

  hfcv() {
    console.log("valchange");
    this.changeDetect.detectChanges();
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
      this.changeDetect.detectChanges();
    // this.numFc.statusChanges.subscribe((val: any) => {
    //   console.log("status changes", val);
    // });
    this.numFc.valueChanges.subscribe((val: any) => {
      console.log("value changes", val);
    })
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
