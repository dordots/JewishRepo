import {Component, ViewChild} from '@angular/core';
import {ViewController} from "ionic-angular";
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {GoogleMapComponent} from "../google-map/google-map";
import Map = google.maps.Map;
import Marker = google.maps.Marker;

@Component({
  selector: 'fk-location-picker',
  templateUrl: 'location-picker.html'
})
export class LocationPickerComponent {
  @ViewChild('mapComponent') mapComponent: GoogleMapComponent;

  marker: Marker;

  constructor(private viewCtrl: ViewController,
              private mapProvider: GoogleMapProvider) {
    console.log('Hello LocationPickerComponent Component');
  }

  ngAfterViewInit(){
    this.mapComponent.onMapCreated.subscribe(args=>{
      this.initOnLocationPressed(this.mapComponent.map);
    });
  }

  private async onDismiss() {
    this.viewCtrl.dismiss()
  }

  private onSubmit(){
    this.viewCtrl.dismiss(this.marker.getPosition());
  }

  private initOnLocationPressed(map: Map){
    map.addListener('click',args => {
      if (this.marker)
        this.marker.setMap(null);

      this.marker = this.mapProvider.createMarkerAt(map, args.latLng);
    });
  }

}
