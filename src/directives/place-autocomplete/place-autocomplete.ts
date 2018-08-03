import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import Autocomplete = google.maps.places.Autocomplete;

@Directive({
  selector: '[fkPlaceAutoComplete]'
})
export class PlaceAutoCompleteComponent implements AfterContentInit, OnDestroy {
  private _inputElement: HTMLInputElement;

  @Input() set inputElement(v) {
    if (v != null){
      this.validateElementIsHTMLInputElement(v);
      this._inputElement = v;
      this.initAutoComplete();
      this.registerToInputElementEvents();
    }
  }

  get inputElement() {
    return this._inputElement;
  }

  @Input() useNativeInput: boolean = false;

  @Input() map;

  @Input() toMarkerSelectedPlace: boolean = false;

  @Output() placeSelected: EventEmitter<MapObject>;

  userFriendlyAddress: string;
  autoComplete: Autocomplete;
  marker: google.maps.Marker;

  constructor(private googleMapProvider: GoogleMapProvider, private el: ElementRef) {
    console.log('Hello PlaceAutocompleteComponent directive');
    this.placeSelected = new EventEmitter<ServerMapObject>();
  }

  async ngAfterContentInit() {
    try {
      if (this.useNativeInput)
        this.inputElement = this.el.nativeElement;
      if (this.inputElement != null) {
        this.registerToInputElementEvents();
        this.initAutoComplete();
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  ngOnDestroy(): void {
    this.inputElement.removeEventListener("change", this.onInputChange.bind(this));
    this.inputElement.removeEventListener("focus", this.onInputChange.bind(this));
    this.inputElement.removeEventListener("blur", this.onInputChange.bind(this));
  }

  private registerToInputElementEvents() {
    this.inputElement.addEventListener("change", this.onInputChange.bind(this));
    this.inputElement.addEventListener("focus", this.onInputChange.bind(this));
    this.inputElement.addEventListener("blur", this.onInputChange.bind(this));
  }

  async initAutoComplete() {
    await this.googleMapProvider.loadAPI();
    let htmlInput = this.inputElement;
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
      this.placeSelected.emit({
        latLng: place.geometry.location.toJSON(),
        userFriendlyAddress: place.formatted_address
      });

      this.userFriendlyAddress = place.formatted_address;
      this.inputElement.value = this.userFriendlyAddress;

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

  private validateElementIsHTMLInputElement(el) {
    if (!(el instanceof HTMLInputElement))
      throw new Error("Input element must be type of HTMLInputElement");
  }

  private onInputChange(){
    this.userFriendlyAddress = this.inputElement.value;
    this.placeSelected.emit(null);
  }

  private onInputFocus(){
    this.inputElement.value = this.userFriendlyAddress || '';
  }

  private onInputBlur(){
    this.inputElement.value = this.userFriendlyAddress || '';
  }
}
