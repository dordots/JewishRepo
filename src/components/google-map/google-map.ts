import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMap} from "../../providers/google-map/google-map";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {NavController} from "ionic-angular";
import {SynagogueDetailsPage} from "../../pages/synagogue-details/synagogue-details";

@Component({
  selector: 'fk-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapComponent implements AfterViewInit, OnDestroy{

  private static mapCounter = 0;

  public readonly canvasElementId: string;
  public map: GoogleMap;

  @Input() mapOptions: google.maps.MapOptions;

  @Output()
  onMapCreated: EventEmitter<GoogleMap>;

  constructor(private mapProvider: GoogleMapProvider,
              private navCtrl: NavController,
              private mapObjectProvider: EventBasedMapObjectProvider) {
    console.log('Hello GoogleMapComponent Component');
    GoogleMapComponent.mapCounter++;
    this.canvasElementId = `google-map-${GoogleMapComponent.mapCounter}`;
    this.onMapCreated = new EventEmitter<GoogleMap>();
  }

  async ngAfterViewInit(){
    let mapElement = document.getElementById(this.canvasElementId) as HTMLDivElement;
    this.map = await this.mapProvider.createMap(mapElement, this.mapOptions);
    this.map.enableLocationTracking();
    this.onMapCreated.emit(this.map);
    this.fetchAllMapObjectsAround();
  }

  ngOnDestroy(): void {
    if (!this.map)
      return;
    this.map.disableLocationTracking();
    this.map.dispose();
    this.map = null;
  }

  private fetchAllMapObjectsAround(){
    if (!this.map.map.getCenter())
      return;
    this.mapObjectProvider.getAllInRadius(this.map.map.getCenter().toJSON(),10).subscribe(res => {
      res.forEach(async mo => {
        let res = await this.map.drawEventBasedMapObject(mo);
        res.infoWindow.onClick.subscribe(async v => {
          await this.navCtrl.push(SynagogueDetailsPage, {mapObject: v.mapObject});
          res.infoWindow.close();
        })
      });
    }, err => {
      console.log(err);
    });
  }
}
