import LatLngLiteral = google.maps.LatLngLiteral;
import {MapObjectTypes} from "../common/enums/map-object-types";
import {Event} from "../event/event";

export class EventBasedMapObject implements ApplicationMapObject{
  _id: string;
  latLng: google.maps.LatLngLiteral;
  type: MapObjectTypes;
  userFriendlyAddress: string;
  events: Array<Event>;

  isEventExist(event: Event){
    return !this.events.every(ev => ev.equals(event));
  }
}

export interface ApplicationMapObject extends MapObject{
  _id: string;
  type: MapObjectTypes;
}

export interface MapObject {
  latLng: LatLngLiteral;
  userFriendlyAddress?: string;
}
