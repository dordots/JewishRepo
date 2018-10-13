import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import {MapObject} from "../map-objects/map-objects";
import moment = require("moment");
import {isArray, keys} from "lodash-es";

export class SearchEvent {
  name: string;
  radiusRange = 0;
  maxRadiusRange = 1;
  mapObject: MapObject;
  startTime: Date;
  endTime: Date;
  daysRange: number[];
  synagogueOptions: SynagogueOptions;
  prayerNosach: string;

  constructor(){
    this.daysRange = [];
    this.mapObject = new MapObject();
    this.synagogueOptions = CreateSynagogueOptions();
  }

  toServerModel(){
    const model = {
      name: this.name,
      address: this.mapObject.userFriendlyAddress,
      lat: this.mapObject.latLng.lat,
      lon: this.mapObject.latLng.lng,
      min_radius: this.radiusRange,
      max_radius: this.maxRadiusRange,
      start_time: (this.startTime && moment(this.startTime).format('hh:mm')) || null,
      end_time: (this.endTime && moment(this.endTime).format('hh:mm')) || null,
      days: this.daysRange,
      nosach: this.prayerNosach && this.prayerNosach
    };

    keys(this.synagogueOptions).forEach(k => {
      if (this.synagogueOptions[k] && this.synagogueOptions[k] == true)
        model[`externals.${k}`] = true;
    });

    Object.keys(model).forEach(k => {
      if (model[k] == null || (isArray(model[k]) && model[k].length == 0))
        delete model[k];
    });

    return model;
  }
}
