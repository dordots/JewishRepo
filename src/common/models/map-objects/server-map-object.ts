import LatLngLiteral = google.maps.LatLngLiteral;
import {MapObjectTypes} from "../common/enums/map-object-types";
import {Event} from "../event/event";

export interface EventBasedMapObject extends ServerMapObject{
  events: Array<Event>;
  isEventExist(event: Event);
}

export interface ServerMapObject extends MapObject{
  _id: string;
  type: MapObjectTypes;
}

export interface MapObject {
  latLng: LatLngLiteral;
  userFriendlyAddress?: string;
}
