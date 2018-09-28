import LatLngLiteral = google.maps.LatLngLiteral;
import {MapObjectTypes} from "../common/enums/map-object-types";
import {Event} from "../event/event";
import {merge} from "lodash-es";

export class MapObject {
  latLng: LatLngLiteral = null;
  userFriendlyAddress?: string = null;

  constructor(args?: Partial<MapObject>){
    merge(this, args);
  }

  isFullyValid(){
    return this.isUserFriendlyAddressValid() && this.isLatLngValid();
  }

  isPartiallyValid(){
    return this.isUserFriendlyAddressValid() || this.isLatLngValid();
  }

  isUserFriendlyAddressValid(){
    return this.userFriendlyAddress && this.userFriendlyAddress !== '';
  }

  isLatLngValid(){
    return this.latLng && this.latLng.lng && this.latLng.lat;
  }
}

export class ApplicationMapObject extends MapObject{
  _id: string;
  type: MapObjectTypes;
  name: string;
}

export class EventBasedMapObject extends ApplicationMapObject{
  _id: string;
  latLng: google.maps.LatLngLiteral;
  type: MapObjectTypes;
  name: string;
  userFriendlyAddress: string;
  events: Array<Event>;

  isEventExist(event: Event){
    return !this.events.every(ev => ev.equals(event));
  }
}
