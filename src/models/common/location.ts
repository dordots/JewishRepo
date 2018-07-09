import LatLng = google.maps.LatLng;

export enum AccessibilityOption {
  HandicappedParking,
  FreeParking,
  PaidParking
}

export class Location {
  accessibilityOptions?: Array<AccessibilityOption>;
  latLng: LatLng;
}
