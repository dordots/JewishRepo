import {Location} from "../location";
import {Event} from "../event/event";
import {SynagogueService} from "./synagogue-service";
import {PrayerVersion} from "../all-enums";

export class Synagogue {
  name: string;
  mainPrayerVersion: PrayerVersion;
  location: Location;
  events: Array<Event>;
  services: Array<SynagogueService>;
}
