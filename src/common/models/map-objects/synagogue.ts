import {Event} from "../event/event";
import LatLng = google.maps.LatLng;
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {Accessibility} from "../common/enums/accessibility";
import {MapObject} from "./map-object";

export class Synagogue implements MapObject {
  name: string;
  primaryPrayerNosach: PrayerNosach;
  latLng: LatLng;
  userFriendlyAddress: string;
  events: Array<Event>;
  phone: string;
  accessibility: Accessibility[];
  picture: string;
}
