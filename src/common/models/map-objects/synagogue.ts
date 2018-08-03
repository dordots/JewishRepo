import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {ServerModel} from "../common/server-model";
import {pick} from "lodash";
import {generateObjectId} from "../common/utils";
import {merge} from "lodash-es";
import {EventBasedMapObject} from "./server-map-object";
import {MapObjectTypes} from "../common/enums/map-object-types";
import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import LatLngLiteral = google.maps.LatLngLiteral;

export class Synagogue implements EventBasedMapObject, ServerModel {
  _id: string;
  latLng: LatLngLiteral;
  userFriendlyAddress: string;
  type = MapObjectTypes.Synagogue;
  name: string;
  primaryPrayerNosach: PrayerNosach;
  events: Array<Event> = [];
  phone: string[] = [];
  synagogueOptions: SynagogueOptions = CreateSynagogueOptions();
  picture: string;

  fromServerModel(serverModel: any): Synagogue{
    let model = new Synagogue();
    merge(model, pick(serverModel, ['_id', 'name','primaryPrayerNosach','latlng', 'userFriendlyAddress','events','phone','picture']));
    model.synagogueOptions = serverModel.externals.synagogueOptions;
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
        accessibility: this.synagogueOptions
      }
    }
  }

  isEventExist(event: Event) {
    return this.events.find(ev => ev.title == event.title) != null;
  }
}
