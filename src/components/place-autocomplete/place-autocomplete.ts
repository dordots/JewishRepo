import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import Autocomplete = google.maps.places.Autocomplete;
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {MapObject} from "../../common/models/map-objects/map-object";

@Component({
  selector: 'fk-place-autocomplete',
  templateUrl: 'place-autocomplete.html',
})
export class PlaceAutocompleteComponent implements AfterViewInit{

  @ViewChild("input", {read: ElementRef}) inputElement: ElementRef;

  @Input()
  map;

  @Input()
  inputId: string = "";

  @Output()
  onPlaceSelected: EventEmitter<MapObject>;

  autoComplete: Autocomplete;
  marker: google.maps.Marker;

  constructor(private googleMapProvider: GoogleMapProvider) {
    console.log('Hello PlaceAutocompleteComponent Component');
    this.onPlaceSelected = new EventEmitter<MapObject>();
  }

  async ngAfterViewInit() {
    try{
      await this.googleMapProvider.loadAPI();
    }
    catch (e) {
      console.error(e);
    }
    this.initAutoComplete();
  }

  initAutoComplete() {
    let htmlInput = (this.inputId && document.getElementById(this.inputId)) || this.inputElement.nativeElement.firstElementChild;
    htmlInput.style.width = "100%";
    this.autoComplete = new google.maps.places.Autocomplete(htmlInput);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    if (this.map)
      this.autoComplete.bindTo('bounds', this.map);

    // Set the data fields to return when the user selects a place.
    this.autoComplete.setValues(['address_components', 'geometry', 'icon', 'name']);

    this.autoComplete.addListener('place_changed', () => {
      let place = this.autoComplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        return;
      }
      this.onPlaceSelected.emit({
        latLng: place.geometry.location.toJSON(),
        userFriendlyAddress: place.formatted_address
      });

      if (!this.map)
        return;

      if (this.marker)
        this.marker.setMap(null);

      this.marker = this.googleMapProvider.createMarkerAt(this.map, place.geometry.location);

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);  // Why 17? Because it looks good.
      }
    });
  }
}
