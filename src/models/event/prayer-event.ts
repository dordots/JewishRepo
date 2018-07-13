import {Event, EventDate} from "./event";
import {Location} from "../common/location";
import {PrayerVersion} from "../common/enums";

export class PrayerEvent extends Event {
  date: EventDate;
  location: Location;
  title: string;
  styles: PrayerVersion[];
  types: PrayerEvent;
}
