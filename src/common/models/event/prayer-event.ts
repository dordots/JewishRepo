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
    this.prayerType = model.minyan;
    this.nosach = model.nosach;
    return this;
  }

  toServerModel(){
    let model = super.toServerModel() as any;
    model.minyan = this.prayerType.toString();
    model.nosach = this.nosach && this.nosach.toString();
    return model;
  }

  getEventName(): string {
    return "תפילת " + this.prayerType;
  }

  equals(other: any): boolean {
    if (!(other instanceof PrayerEvent) || other == null)
      return false;
    return super.equals(other) && this.prayerType == other.prayerType && this.nosach == other.nosach;
  }
}
