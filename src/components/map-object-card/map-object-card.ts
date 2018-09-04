import {Component, Input} from '@angular/core';
import {EventBasedMapObject} from "../../common/models/map-objects/map-objects";
import {EventTypes} from "../../common/models/common/enums/event-types";
import moment = require("moment");
import {NavController} from "ionic-angular";
import {SynagogueDetailsPage} from "../../pages/synagogue-details/synagogue-details";
import {PrayerEvent} from "../../common/models/event/prayer-event";
import {LessonEvent} from "../../common/models/event/lesson-event";

@Component({
  selector: 'fk-map-object-card',
  templateUrl: 'map-object-card.html'
})
export class MapObjectCardComponent {

  @Input() mapObject: EventBasedMapObject;

  prayers: PrayerEvent[];
  lessons: LessonEvent[];

  constructor(private navCtrl: NavController) {
    console.log('Hello EventCardComponent Component');
  }

  getSoonestEvent(type: EventTypes = EventTypes.Prayer){
    if (this.mapObject.events.length == 0)
      return;
    let sorted = this.mapObject.events.filter(e => e.type == type)
      .sort((e1, e2) => e1.startTime.getTime() - e2.startTime.getTime());
    let soonestEvent = sorted[0];
    if (soonestEvent == null)
      return this.getSoonestEvent(EventTypes.Lesson);
    return soonestEvent;
  }

  getLastVerified(){
    let date = this.mapObject.events.map(e => e.verifiedRecentlyAt)
      .sort((e1, e2)=>e1.getTime() - e2.getTime())[0];
    return moment(date).format('L');
  }

  getRelativeDistance(){
    return 500;
  }

  goToPageDetails() {
    this.navCtrl.push('SynagogueDetailsPage',{mapObject: this.mapObject},{
      direction: 'up'
    })
  }
}
