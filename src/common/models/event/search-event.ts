import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";
import {MapObject} from "../map-objects/map-objects";

export class SearchEvent {
  name: string;
  radiusRange: number;
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
}
