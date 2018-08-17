import {Event} from "./event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {PrayerTypes} from "../common/enums/prayer-types";
import {EventTypes} from "../common/enums/event-types";

export class LessonEvent extends Event {
  title: string;
  constructor(){
    super();
    this.type = EventTypes.Lesson;
  }

  getEventName(): string {
    return this.title;
  }
}
