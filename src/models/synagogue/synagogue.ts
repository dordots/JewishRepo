import {Location} from "../common/location";
import {Event} from "../event/event";
import {SynagogueService} from "./synagogue-service";

export class Synagogue {
  name: string;
  location: Location;
  events: Array<Event>;
  services: Array<SynagogueService>;
}
