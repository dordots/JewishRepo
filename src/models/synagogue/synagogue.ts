import {Location} from "../common/location";
import {Event} from "../event/event";
import {SynagogueService} from "./synagogue-service";
import {Prayer} from "../common/prayer";
import PrayerVersion = Prayer.PrayerVersion;

export class Synagogue {
  name: string;
  mainVersion: PrayerVersion
  location: Location;
  events: Array<Event>;
  services: Array<SynagogueService>;
}
