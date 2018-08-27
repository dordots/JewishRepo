import {AbstractControl} from "@angular/forms";
import moment = require("moment");
import {MapObject} from "../common/models/map-objects/server-map-object";

export class StaticValidators {
  static ArrayLengthInRange(min: number, maxExclusive = (min+1)){
    return (control: AbstractControl) => {
      let length = control.value.length;
      if (length >= min && length < maxExclusive)
        return null;

      return {isLengthInRange: false};
    };
  }

  static ValidDate(dateFormat){
    return (c) => {
      if (this.isStringValidDate(c.value, dateFormat))
        return null;
      return {invalidDate: true};
    }
  }

  static ValidDateIsAfter(baselineDateCallback: ()=>Date, controlTimeFormat: string) {
      return (control: AbstractControl) => {
        let baseline = moment(baselineDateCallback(), controlTimeFormat);
        let target = moment(control.value, controlTimeFormat);
        if (!baseline.isValid() && target.isValid())
          return null;
        if (baseline.isValid() && target.isValid())
          return target.isAfter(baseline) ? null : {dateIsNotAfter: true};
      };
  }

  static ValidDateIsBefore(baselineDateCallback: ()=>Date, controlTimeFormat: string) {
    return (control: AbstractControl) => {
      if (this.ValidDateIsAfter(baselineDateCallback, controlTimeFormat)(control) != null)
        return {dateIsNotBefore: true};
      return null;
    };
  }

  static ValidateLocation(mapObejctCallback: ()=> MapObject, required=true){
    return (c) => {
      let mapObject = mapObejctCallback();
      if (mapObject == null || mapObject.userFriendlyAddress == null || mapObject.latLng == null && required){
        return {invalidMapObject: true};
      }
      return null;
    }
  }

  private static isStringValidDate(date: string, format: string) {
    return moment(date, format).isValid()
  }
}
