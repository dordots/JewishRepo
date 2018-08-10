import {Event} from "./event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {PrayerTypes} from "../common/enums/prayer-types";

export class PrayerEvent extends Event {

  nosach: PrayerNosach;
  types: PrayerTypes;

  constructor(){
    super();
  }
}
