import {Component} from '@angular/core';

@Component({
  selector: 'day-range',
  templateUrl: 'day-range.html'
})
export class DayRangeComponent {

  text: string;

  constructor() {
    console.log('Hello DayRangeComponent Component');
    this.text = 'Hello World';
  }

  onDayClicked(i) {
    // this.selectedDays
  }
}
