import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"],
})
export class ShowcaseComponent implements OnInit {
  errorMessage: string = "";
  text: string;
  number: number;
  textFc: FormControl;
  numFc: FormControl;

  constructor(private changeDetect: ChangeDetectorRef) {
    this.textFc = new FormControl();
    this.numFc = new FormControl();
  }

  ngOnInit(): void {}

  randomErrMsg() {
    this.errorMessage = JSON.stringify(Math.random() * 100);
    this.changeDetect.detectChanges();
  }

  resetErrMsg() {
    this.errorMessage = "";
    this.changeDetect.detectChanges();

  }
}
