import LatLng = google.maps.LatLng;
import {AccessibilityOption} from "./accessibility";

export class Location {
  accessibilityOptions?: Array<AccessibilityOption>;
  latLng: LatLng;
}
