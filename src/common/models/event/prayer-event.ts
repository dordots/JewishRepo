import {Event} from "./event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {PrayerType} from "../common/enums/prayer-type";
import {EventTypes} from "../common/enums/event-types";

export class PrayerEvent extends Event {

  constructor(public prayerType?: PrayerType, public nosach?: PrayerNosach){
    super();
    this.type = EventTypes.Prayer;
  }

  fromServerModel(model: any){
    super.fromServerModel(model);
    this.prayerType = model.types;
    return this;
  }

  getEventName(): string {
    return "תפילת " + this.prayerType;
  }

  equals(other: Event): boolean {
    if (!(other instanceof PrayerEvent) || other == null)
      return false;
    return super.equals(other) && this.prayerType == other.prayerType && this.nosach == other.nosach;
  }
}
