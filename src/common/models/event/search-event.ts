import LatLngLiteral = google.maps.LatLngLiteral;
import {CreateSynagogueOptions, SynagogueOptions} from "../common/enums/synagogue-option";

export class SearchEvent {
  radiusRange: number;
  locationLatLng: LatLngLiteral;
  userFriendlyAddress: string;
  startTime: Date;
  endTime: Date;
  synagogueOptions: SynagogueOptions;

  constructor(){
    this.synagogueOptions = CreateSynagogueOptions();
  }
}
