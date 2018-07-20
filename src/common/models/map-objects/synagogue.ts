import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {Accessibility} from "../common/enums/accessibility";
import {MapObject} from "./map-object";
import LatLngLiteral = google.maps.LatLngLiteral;

export class Synagogue implements MapObject {
  name: string;
  primaryPrayerNosach: PrayerNosach;
  latLng: LatLngLiteral;
  userFriendlyAddress: string;
  events: Array<Event>;
  phone: string;
  accessibility: Accessibility[];
  picture: string;
}
