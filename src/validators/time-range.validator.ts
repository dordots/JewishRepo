import {AbstractControl} from "@angular/forms";
import moment = require("moment");

export function ValidateEndTime(startTime: ()=>Date, controlTimeFormat: string, isRequired=false) {
  return (control: AbstractControl) => {
    let time = startTime();

    if ((!isRequired && (!time || !moment(time).isValid())) ||
        moment(control.value, controlTimeFormat).toDate().getTime() > startTime().getTime())
      return null;

    return {validEndTime: false};
  };
}
