import LatLng = google.maps.LatLng;
import {Accessibility} from "./all-enums";

export class Location {
  accessibilityOptions?: Array<Accessibility>;
  latLng: LatLng;
}
