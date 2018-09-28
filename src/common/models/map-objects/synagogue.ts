import {Event} from "../event/event";
import {PrayerNosach} from "../common/enums/prayer-nosach";
import {ServerModel} from "../common/server-model";
import {generateObjectId} from "../common/utils";
import {merge, pick} from "lodash-es";
import {MapObjectTypes} from "../common/enums/map-object-types";
import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import LatLngLiteral = google.maps.LatLngLiteral;
import {PrayerEvent} from "../event/prayer-event";
import {EventBasedMapObject} from "./map-objects";

export class Synagogue extends EventBasedMapObject implements ServerModel {
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
  comments: string;

  fromServerModel(serverModel: any): Synagogue{
    let model = new Synagogue();
    let requiredFieldsFromServerModel = pick(serverModel, ['_id', 'name','primaryPrayerNosach','latlng', 'userFriendlyAddress','phone','picture', 'comments']);
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
      comments: this.comments,
      externals: {
        accessibility: this.synagogueOptions
      }
    }
  }

  isEventExist(event: Event) {
    // return this.events.find(ev => ev.title == event.title) != null;
    return false;
  }
}
