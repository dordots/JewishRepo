import {Event} from "../event/event";
import LatLng = google.maps.LatLng;
import {PrayerNosach} from "../common/enums/prayer-nosach";

export class Synagogue {
  name: string;
  primaryPrayerNosach: PrayerNosach;
  location: LatLng;
  friendlyAddress: string;
  events: Array<Event>;
  phone: string;
  picture: string;
}
