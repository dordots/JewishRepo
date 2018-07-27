import LatLngLiteral = google.maps.LatLngLiteral;
import {MapObjectTypes} from "../common/enums/map-object-types";
import {Event} from "../event/event";

export interface EventBasedMapObject extends ServerMapObject{
  addEvent: (event: Event) => Promise<void>;
}

export interface ServerMapObject extends MapObject{
  _id: string;
  type: MapObjectTypes;
}

export interface MapObject {
  latLng: LatLngLiteral;
  userFriendlyAddress?: string;
}
