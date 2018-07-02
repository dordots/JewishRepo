import {Component, Input} from '@angular/core';

@Component({
  selector: 'fk-event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  text: string;

  @Input()
  event: Event;

  constructor() {
    console.log('Hello EventCardComponent Component');
  }
}
