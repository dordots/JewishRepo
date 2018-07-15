import {Component, Input} from '@angular/core';
import {Event} from "../../Models/event/event";
import moment = require("moment");
import {CardEvents} from "../../mocks/rendered-data/card-event-data";

@Component({
  selector: 'fk-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListComponent {

  @Input()
  events: Array<any>;

  constructor() {
    console.log('Hello EventsListComponent Component');
    this.events = CardEvents;
  }

}
