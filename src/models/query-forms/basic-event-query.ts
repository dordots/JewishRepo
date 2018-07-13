import {EventDate} from "../event/event";
import LatLng = google.maps.LatLng;

export interface BasicEventQuery {
  rangeRadius: number;
  eventDate: EventDate;
  relativeLocation: LatLng
}
