import LatLng = google.maps.LatLng;
import {Accessibility} from "./enums";

export class Location {
  accessibilityOptions?: Array<Accessibility>;
  latLng: LatLng;
}
