import {Event, EventDate} from "./event";
import {Location} from "../common/location";
import {Prayer} from "../common/prayer";
import PrayerVersion = Prayer.PrayerVersion;

export class PrayerEvent implements Event {
  date: EventDate;
  location: Location;
  title: string;
  styles: PrayerVersion[];
  types: PrayerEvent;
}
