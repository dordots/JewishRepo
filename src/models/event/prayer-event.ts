import {Event} from "./event";
import {MomentRange} from "moment-range";
import {PrayerNosach} from "../common/enums/prayer-nosach";

export class PrayerEvent implements Event {
  title: string;
  nosach: PrayerNosach;
  dateRange: MomentRange;
  repeatedDays: number[];
  types: PrayerEvent;
}
