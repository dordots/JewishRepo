import LatLng = google.maps.LatLng;
import {Accessibility} from "./accessibility";
import AccessibilityOption = Accessibility.AccessibilityOption;

export class Location {
  accessibilityOptions?: Array<AccessibilityOption>;
  latLng: LatLng;
}
