import {Location} from "../common/location";
import {Event} from "../event/event";
import {SynagogueService} from "./synagogue-service";
import {PrayerVersion} from "../common/enums";

export class Synagogue {
  name: string;
  mainPrayerVersion: PrayerVersion;
  location: Location;
  events: Array<Event>;
  services: Array<SynagogueService>;
}
