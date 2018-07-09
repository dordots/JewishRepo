import { Component } from '@angular/core';
import {Event} from "../../Models/event/event";

@Component({
  selector: 'fk-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListComponent {

  events: Array<Event>;

  constructor() {
    console.log('Hello EventsListComponent Component');
    this.events = [];
    // this.events = this.events.concat(this.events);
    // this.events = this.events.concat(this.events);
    // this.events = this.events.concat(this.events);
  }

}
