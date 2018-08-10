import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {ServerModel} from "../common/server-model";
import {generateObjectId} from "../common/utils";
import {merge, pick} from "lodash-es";
import {EventBasedMapObject} from "./server-map-object";
import {MapObjectTypes} from "../common/enums/map-object-types";
import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import LatLngLiteral = google.maps.LatLngLiteral;
import {PrayerEvent} from "../event/prayer-event";

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
    let requiredFieldsFromServerModel = pick(serverModel, ['_id', 'name','primaryPrayerNosach','latlng', 'userFriendlyAddress','phone','picture']);
    merge(model, requiredFieldsFromServerModel);
    model.synagogueOptions = serverModel.externals;
    model.events = serverModel.events.map(ev => {
      let evModel = new PrayerEvent();
      evModel.fromServerModel(ev);
      return evModel;
    });
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
