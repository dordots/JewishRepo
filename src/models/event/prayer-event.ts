import {Event, EventDate} from "./event";
import {Location} from "../location";
import {PrayerVersion} from "../all-enums";

export class PrayerEvent extends Event {
  date: EventDate;
  location: Location;
  title: string;
  styles: PrayerVersion[];
  types: PrayerEvent;
}
