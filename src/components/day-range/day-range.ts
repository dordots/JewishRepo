import {Component, Input} from '@angular/core';
import {range} from "lodash";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";

@Component({
  selector: 'fk-day-range',
  templateUrl: 'day-range.html',
  providers: [MakeProvider(DayRangeComponent)]
})
export class DayRangeComponent extends AbstractValueAccessor {

  text: string;

  @Input() minDay = 1;
  @Input() maxDay = 7;

  daysList: Array<{name: string, id: number}>;

  constructor() {
    super();
    console.log('Hello DayRangeComponent Component');
    this.text = 'Hello World';
    this.daysList = ['א','ב','ג','ד','ה','ו','ש',].map((d,i) => ({name: d, id: i+1}));
    this.value = [];
  }

  onDayClicked(i) {
    let index = this.value.findIndex(d => d == i);
    if (index != -1) {
      this.value.splice(index,1);
    }
    else
      this.value.push(i);
    this.onChange(this.value);
  }

  isDaySelected(i) {
    return this.value.findIndex(d => d == i) != -1;
  }


}
