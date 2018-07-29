import {Event} from "./event";
import {PrayerNosach} from "../common/enums/prayer-nosach";

export class PrayerEvent implements Event {

  title: string;
  nosach: PrayerNosach;
  startTime: Date;
  endTime: Date;
  repeatedDays: number[];
  types: PrayerEvent;

  constructor(){
    this.repeatedDays = [];
  }
}
