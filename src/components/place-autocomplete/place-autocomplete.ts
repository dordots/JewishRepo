import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";
import {Searchbar} from "ionic-angular";
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import Autocomplete = google.maps.places.Autocomplete;

@Component({
  selector: 'fk-place-autocomplete',
  templateUrl: 'place-autocomplete.html',
  providers: [MakeProvider(PlaceAutocompleteComponent)]
})
export class PlaceAutocompleteComponent extends AbstractValueAccessor implements AfterViewInit{

  @ViewChild("input") inputElement: Searchbar;

  @Input()
  map;

  @Input()
  inputId: string;

  @Input()
  toMarkerSelectedPlace: boolean = false;

  @Output()
  placeSelected: EventEmitter<MapObject>;

  userFriendlyAddress: string;
  autoComplete: Autocomplete;
  marker: google.maps.Marker;

  constructor(private googleMapProvider: GoogleMapProvider) {
    super();
    console.log('Hello PlaceAutocompleteComponent Component');
    this.placeSelected = new EventEmitter<ServerMapObject>();
  }

  async ngAfterViewInit() {
    try{
      await this.googleMapProvider.loadAPI();
      this.initAutoComplete();
    }
    catch (e) {
      console.error(e);
    }
  }

  initAutoComplete() {
    let htmlInput = (this.inputId && document.getElementById(this.inputId)) ||
                    this.inputElement._searchbarInput.nativeElement;
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
      this.value = {
        latLng: place.geometry.location.toJSON(),
        userFriendlyAddress: place.formatted_address
      };
      this.placeSelected.emit(this.value);

      this.userFriendlyAddress = place.formatted_address;

      if (!this.map)
        return;

      if (this.marker)
        this.marker.setMap(null);

      if (this.toMarkerSelectedPlace)
        this.marker = this.googleMapProvider.createMarkerAt(this.map, place.geometry.location.toJSON());

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);  // Why 17? Because it looks good.
      }
    });
  }

  onInputChanged() {
    this.value = {}
  }
}
