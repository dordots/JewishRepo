import {Component, Input} from '@angular/core';

@Component({
  selector: 'fk-event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  @Input()
  event: any;

  constructor() {
    console.log('Hello EventCardComponent Component');
  }
}
