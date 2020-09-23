import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"],
})
export class ShowcaseComponent implements OnInit, AfterViewInit {
  text: string;

  formGroup: FormGroup;

  fcNames: string[] = [];

  constructor(private changeDetect: ChangeDetectorRef, private fb: FormBuilder) {
    let initialGeo = { lat: 43, lon: 6 };
    this.formGroup = this.fb.group({
      number: [2.321321, [Validators.required, Validators.min(3), Validators.max(10)]],
      text: ["4", [Validators.required, Validators.minLength(2)]],
      geo: [initialGeo, Validators.required]
    });

    // Test 100 formControls
    // for (let i = 0; i<100; ++i) {
    //   let name = "text"+i;
    //   this.formGroup.addControl(name, new FormControl(name));
    //   this.fcNames.push(name);
    // }
  }

  /** Used to display all errors in one object */
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

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    // TODO Si jamais on instancie le formulaire avec une erreur custom (creee par un field Naval Front) qui est deja a true
    // Il faut faire un changeDetection.
    // Normalement, on doit pas pouvoir instancier un formulaire avec une valeur fausse (non détectée par les Validator (required etc...))
    // this.changeDetect.detectChanges();
  }

  ngOnInit(): void {
    // Si on veut afficher directement les erreurs et pas seulement quand touched
    // this.formGroup.markAllAsTouched();
  }

  toggleDisableEnable() {
    this.formGroup.disabled ? this.formGroup.enable() : this.formGroup.disable();
  }

  writeRandomValues() {
    let randNum = parseInt(Math.random() * 100 + "");
    this.formGroup.setValue({
      number: randNum,
      text: "t" + randNum,
      geo: { lat: randNum + 1, lon: randNum }
    });
  }
}
