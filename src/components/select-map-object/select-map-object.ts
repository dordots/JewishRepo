import {Component, ViewChild} from '@angular/core';
import {ApplicationMapObject, MapObject} from "../../common/models/map-objects/map-objects";
import {ViewController} from "ionic-angular";
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMapComponent} from "../google-map/google-map";
import {isEqual} from "lodash-es";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import Marker = google.maps.Marker;
import LatLngLiteral = google.maps.LatLngLiteral;
import {GoogleMap} from "../../providers/google-map/google-map";

@Component({
  selector: 'fk-select-map-object',
  templateUrl: 'select-map-object.html'
})
export class SelectMapObjectComponent {

  @ViewChild('mapComponent') mapComponent: GoogleMapComponent;

  private nearbyMapObjectsMarkers: Marker[];

  selectedMapObjectId: string;
  map: GoogleMap;

  constructor(private viewCtrl: ViewController,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private googleMapProvider: GoogleMapProvider) {
    console.log('Hello SelectMapObjectComponent Component');
  }

  ngAfterViewInit(){
    this.mapComponent.onMapCreated.subscribe(map => {
      this.map = map;
    });
  }

  async onValidPlace(mapObject: MapObject) {
    if (mapObject == null)
      return;
    let nearby = await this.mapObjectProvider.getAllInRadius(mapObject.latLng,5).toPromise();
    nearby[0].latLng = mapObject.latLng;
    this.nearbyMapObjectsMarkers = await this.map.drawSimpleMapObjects(nearby);
    this.nearbyMapObjectsMarkers.forEach(marker => marker.addListener('click',args => {
      this.selectedMapObjectId = this.getMapObjectFromLatLng(nearby, marker.getPosition().toJSON());
      this.onValidMapObjectSelected();
    }));
  }

  getMapObjectFromLatLng(mapObjects: ApplicationMapObject[], latLng: LatLngLiteral){
    return mapObjects.find(marker => isEqual(marker.latLng, latLng))._id;
  }

  onValidMapObjectSelected(){
    this.viewCtrl.dismiss(this.selectedMapObjectId);
  }
}
