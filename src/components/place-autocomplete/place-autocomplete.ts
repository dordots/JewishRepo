import {Component, Input} from '@angular/core';
import Autocomplete = google.maps.places.Autocomplete;
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";

@Component({
  selector: 'fk-place-autocomplete',
  templateUrl: 'place-autocomplete.html'
})
export class PlaceAutocompleteComponent {

  inputId: string;
  autoComplete: Autocomplete;
  marker: google.maps.Marker;
  matchedPlaces: string[];
  selectedPlace: string;

  @Input()
  map;

  constructor(private googleMapProvider: GoogleMapProvider) {
    console.log('Hello PlaceAutocompleteComponent Component');
    this.inputId = "place-auto-complete-input";
  }

  async ngAfterViewInit() {
    await this.googleMapProvider.loadAPI();
    this.initAutoComplete();
  }

  initAutoComplete() {
    let ionInput = document.getElementById(this.inputId);
    let htmlInput = ionInput.getElementsByTagName('input')[0] as HTMLInputElement;
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
