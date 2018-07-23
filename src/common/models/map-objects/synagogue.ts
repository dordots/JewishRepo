import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {Accessibility} from "../common/enums/accessibility";
import {MapObject} from "./map-object";
import LatLngLiteral = google.maps.LatLngLiteral;
import {ServerModel} from "../common/server-model";
import {pick} from "lodash";
import {generateObjectId} from "../common/utils";

export class Synagogue implements MapObject, ServerModel {
  _id: string;
  name: string;
  primaryPrayerNosach: PrayerNosach;
  latLng: LatLngLiteral;
  userFriendlyAddress: string;
  events: Array<Event>;
  phone: string;
  accessibility: Accessibility[];
  picture: string;

  fromServerModel(serverModel: any) {
    let appModel = pick(serverModel, ['name','primaryPrayerNosach','latlng', 'userFriendlyAddress','events','phone','picture']) as any;
    appModel.accessibility = serverModel.externals.accessibility;
    return appModel;
  }

  toServerModel(): any {
    return {
      _id: this._id || generateObjectId(),
      name: this.name,
      userFriendlyAddress: this.userFriendlyAddress,
      latlng: this.latLng,
      primaryPrayerNosach: this.primaryPrayerNosach,
      phone: this.phone,
      image: this.picture,
      events: this.events,
      externals: {
        accessibility: this.accessibility
      }
    }
  }
}
