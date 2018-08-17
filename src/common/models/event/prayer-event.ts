import {Event} from "./event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {PrayerTypes} from "../common/enums/prayer-types";
import {EventTypes} from "../common/enums/event-types";
import {ServerModel} from "../common/server-model";

export class PrayerEvent extends Event {

  nosach: PrayerNosach;
  types: PrayerTypes;

  constructor(){
    super();
    this.type = EventTypes.Prayer;
  }

  fromServerModel(model: any){
    super.fromServerModel(model);
    this.nosach = model.nosach;
    this.types = model.types;
  }

  getEventName(): string {
    return "תפילת " + this.types;
  }
}
