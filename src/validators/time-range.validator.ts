import {AbstractControl} from "@angular/forms";
import moment = require("moment");

export function ValidateEndTime(startTime: ()=>Date, controlTimeFormat: string, isRequired=false) {
  return (control: AbstractControl) => {
    let time = startTime();

    if (time == null && moment(control.value, controlTimeFormat).isValid())
      return {validStartTime: 'false'};

    if (!isRequired && (!time || !moment(time).isValid()))
      return null;

    if (moment(control.value, controlTimeFormat).toDate().getTime() > startTime().getTime())
      return null;

    return {validEndTime: false};
  };
}
