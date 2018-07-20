import LatLngLiteral = google.maps.LatLngLiteral;

export interface MapObject {
  latLng: LatLngLiteral;
  userFriendlyAddress: string;
}
