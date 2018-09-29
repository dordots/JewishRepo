import LatLngLiteral = google.maps.LatLngLiteral;
import {MapObjectTypes} from "../common/enums/map-object-types";
import {Event} from "../event/event";
import {merge} from "lodash-es";
import {ServerModel} from "../common/server-model";
import {EventTypes} from "../common/enums/event-types";
import moment = require("moment");

export class MapObject extends ServerModel{
  latLng: LatLngLiteral = null;
  userFriendlyAddress?: string = null;

  constructor(args?: Partial<MapObject>){
    super();
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

export class EventBasedMapObject extends MapObject{
  _id: string;
  latLng: google.maps.LatLngLiteral;
  type: MapObjectTypes;
  name: string;
  userFriendlyAddress: string;
  events: Array<Event>;
  relativeDistanceInMeter: number;

  dateMembers = ['lastUpdatedAt'];

  isEventExist(event: Event){
    return !this.events.every(ev => ev.equals(event));
  }

  getSoonestEvent(type: EventTypes){
    if (this.events.length == 0)
      return;
    let sorted = this.events.filter(e => e.type == type)
      .sort((e1, e2) => e1.startTime.getTime() - e2.startTime.getTime());
    return sorted.length > 0 ? sorted[0] : null;
  }

  getLastVerified() {
    let date = this.events.map(e => e.verifiedRecentlyAt)
      .sort((e1, e2) => e1.getTime() - e2.getTime())[0];
    return moment(date).format('L');
  }
}
