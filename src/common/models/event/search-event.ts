import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import {MapObject} from "../map-objects/map-objects";
import moment = require("moment");
import {keys} from "lodash-es";

export class SearchEvent {
  name: string;
  radiusRange = 1;
  maxRadiusRange = 25;
  mapObject: MapObject;
  startTime: Date;
  endTime: Date;
  daysRange: number[];
  synagogueOptions: SynagogueOptions;
  prayerNosach: string[];

  constructor(){
    this.daysRange = [];
    this.prayerNosach = [];
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
      start_time: this.startTime && this.startTime && moment(this.startTime).format('hh:mm'),
      end_time: this.endTime && this.endTime && moment(this.endTime).format('hh:mm'),
      days: this.daysRange,
      nosach: this.prayerNosach
    };
    keys(this.synagogueOptions).forEach(k => {
      if (this.synagogueOptions[k] && this.synagogueOptions[k] == true)
        model[`externals.${k}`] = true;
    });

    return model;
  }
}
