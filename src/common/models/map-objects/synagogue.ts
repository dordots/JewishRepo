import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {Accessibility} from "../common/enums/accessibility";
import {ServerModel} from "../common/server-model";
import {pick} from "lodash";
import {generateObjectId} from "../common/utils";
import {merge} from "lodash-es";
import {EventBasedMapObject} from "./server-map-object";
import {MapObjectTypes} from "../common/enums/map-object-types";
import LatLngLiteral = google.maps.LatLngLiteral;

export class Synagogue implements EventBasedMapObject, ServerModel {
  _id: string;
  latLng: LatLngLiteral;
  userFriendlyAddress: string;
  type = MapObjectTypes.Synagogue;
  name: string;
  primaryPrayerNosach: PrayerNosach;
  events: Array<Event> = [];
  phone: string;
  accessibility: Accessibility[];
  picture: string;

  fromServerModel(serverModel: any): Synagogue{
    let model = new Synagogue();
    merge(model, pick(serverModel, ['_id', 'name','primaryPrayerNosach','latlng', 'userFriendlyAddress','events','phone','picture']));
    model.accessibility = serverModel.externals.accessibility;
    return model;
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
