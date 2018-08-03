import {AbstractControl} from "@angular/forms";
import moment = require("moment");

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
      if (moment(c.value, dateFormat).isValid())
        return null;
      return {invalidDate: true};
    }
  }

  static ValidDateIsAfter(baselineDateCallback: ()=>Date, controlTimeFormat: string) {
    return (control: AbstractControl) => {
      let baseline = baselineDateCallback();
      let isEndTimeValid = this.ValidDate(controlTimeFormat)(control) == null;

      if (!isEndTimeValid || moment(control.value, controlTimeFormat).toDate().getTime() > baseline.getTime())
        return null;

      return {validEndTime: false};
    };
  }
}
