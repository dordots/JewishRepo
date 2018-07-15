import {Component, Input} from '@angular/core';
import {Event} from "../../Models/event/event";
import moment = require("moment");

@Component({
  selector: 'fk-events-list',
  templateUrl: 'events-list.html'
})
export class EventsListComponent {

  @Input()
  events: Array<any>;

  constructor() {
    console.log('Hello EventsListComponent Component');
    this.events = [{
      relativeDistance: 530,
      type: "prayer",
      title: "תפילה",
      shortDescription: "תפילת מנחה",
      friendlyAddress: "המשקיף 9 אשדוד",
      verifiedRecentlyAt: new Date().toLocaleDateString(),
      occursBetween: {start: new Date().toLocaleTimeString(), end: moment().add(1,"hour").toDate().toLocaleTimeString()}
    }];
  }

}
