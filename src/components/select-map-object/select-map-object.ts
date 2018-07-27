import {Component, ViewChild} from '@angular/core';
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import {ViewController} from "ionic-angular";
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMapComponent} from "../google-map/google-map";
import {isEqual} from "lodash-es";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import Marker = google.maps.Marker;
import Map = google.maps.Map;
import LatLngLiteral = google.maps.LatLngLiteral;

@Component({
  selector: 'fk-select-map-object',
  templateUrl: 'select-map-object.html'
})
export class SelectMapObjectComponent {

  @ViewChild('mapComponent') mapComponent: GoogleMapComponent;

  private nearbyMapObjectsMarkers: Marker[];

  selectedMapObjectId: string;
  map: Map;

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
    let nearby = await this.mapObjectProvider.getAllInRadius(mapObject.latLng,5).toPromise();
    nearby[0].latLng = mapObject.latLng;
    this.nearbyMapObjectsMarkers = await this.googleMapProvider.drawMapObjects(this.map, nearby);
    this.nearbyMapObjectsMarkers.forEach(marker => marker.addListener('click',args => {
      this.selectedMapObjectId = this.getMapObjectFromLatLng(nearby, marker.getPosition().toJSON());
      this.onValidMapObjectSelected();
    }));
  }

  getMapObjectFromLatLng(mapObjects: ServerMapObject[], latLng: LatLngLiteral){
    return mapObjects.find(marker => isEqual(marker.latLng, latLng))._id;
  }

  onValidMapObjectSelected(){
    this.viewCtrl.dismiss(this.selectedMapObjectId);
  }
}
