import { AbstractControl, ValidationErrors } from "@angular/forms";

export class HomeFrontValidators {
  static geoCoordRequired(control: AbstractControl): ValidationErrors | null {
    let val: { lat: number; lon: number } = control.value;
    let latValid = val && (val.lat === 0 || val.lat);
    let lonValid = val && (val.lon === 0 || val.lon);
    // console.log("revalidate required", control.errors);
    // console.log("revalidate required", val, latValid, lonValid, latValid && lonValid);
    return latValid && lonValid ? null : { required: true };
  }
}
