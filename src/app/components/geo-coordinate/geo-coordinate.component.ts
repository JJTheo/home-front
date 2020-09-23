import { Component, forwardRef, Injector, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CVAConnector } from 'src/app/c-v-a-connector';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'hf-geo-coordinate',
  templateUrl: './geo-coordinate.component.html',
  styleUrls: ["../../styles/base-input-styles.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeoCoordinateComponent),
      multi: true,
    },
  ],
})
export class GeoCoordinateComponent extends CVAConnector implements OnInit {
  @Input() label: string = "";
  @Input() readonly: boolean = false;
  @Input() hideErrorMessage: boolean = false;
  @Input() coordinateNotation: string;

  internalLatValue: string;
  internalLatMask: any;
  internalLonValue: string;
  internalLonMask: any;
  disabled: boolean = false;

  constructor(injector: Injector, errorService: ErrorMessageService) {
    super(injector, errorService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    console.log("ngOnInit");

    this.internalLatMask = this.buildCoordinateMask(true);
    this.internalLonMask = this.buildCoordinateMask(false);
  }

  getErrorMsg(errors: any) {
    console.log("getErrorMsg", errors);
  }

  latChange(val: string) {
    console.log("lat change", val);
    if (val) {
      let substr = val.substr(0, 2);
      console.log("lat change val", substr);
      if (substr || substr === "0") {
        this._onChange({ lat: +substr, lon: this.control.value.lon });
      }
    }
  }

  lonChange(val: any) {
    console.log("lon change", val);
    if (val) {
      let substr = val.substr(0, 2);
      console.log("lon change val", substr);
      if (substr || substr === "0") {
        this._onChange({ lat: this.control.value.lat, lon: +substr });
      }
    }
  }

  buildCoordinateMask(lat: boolean = true) {
    let latNotation = "";
    let lonNotation = "";
    switch (this.coordinateNotation) {
      // No coordinate notations yet, only one mode
      default:
        latNotation = "00° 00.00' S";
        lonNotation = "000° 00.00' S";
        break;
    }
    return {
      mask: lat ? latNotation : lonNotation,
      placeHolderCharacter: " ",
      specialCharacters: ['°', ' ', '.', '\''],
      showMaskTyped: true,
      dropSpecialCharacters: false,
      prefix: null
    }
  }

  /* CONTROL VALUE ACCESSOR IMPL */

  writeValue(val: { lat: number, lon: number }): void {
    console.log("writeValue", val);

    // TODO Pipe transform lat to string
    let pad = (num: number, size: number) => { var s = "00" + parseInt("" + num); return s.substr(s.length - size); }

    if (val && val.lat) {
      // TODO Pipe transform lat to string
      this.internalLatValue = pad(val.lat, 2);
    }
    if (val && val.lon) {
      // TODO Pipe transform lon to string
      this.internalLonValue = pad(val.lon, 3);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    console.log("setDisabledState");
    this.disabled = isDisabled;
  }
}
