import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {StaticValidators} from "../../validators/static-validators";

@Directive({
  selector: '[fkPlaceAutoComplete]',
})
export class PlaceAutoComplete implements AfterContentInit, OnDestroy, Validator {
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

  mapObject: MapObject = {} as any;
  autoComplete: Autocomplete;
  marker: google.maps.Marker;

  constructor(private googleMapProvider: GoogleMapProvider,
              private el: ElementRef) {
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
    this.inputElement.removeEventListener("focus", this.onInputFocus.bind(this));
    this.inputElement.removeEventListener("blur", this.onInputBlur.bind(this));
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return StaticValidators.ValidateLocation(()=> this.mapObject);
  }

  private registerToInputElementEvents() {
    this.inputElement.addEventListener("change", this.onInputChange.bind(this));
    this.inputElement.addEventListener("focus", this.onInputFocus.bind(this));
    this.inputElement.addEventListener("blur", this.onInputBlur.bind(this));
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
      this.mapObject = {
        latLng: place.geometry.location.toJSON(),
        userFriendlyAddress: place.formatted_address
      };
      this.emitEvents();
      this.inputElement.value = this.mapObject.userFriendlyAddress;
      this.handleMapMarkerAndNavigation(place);
    });
  }

  private validateElementIsHTMLInputElement(el) {
    if (!(el instanceof HTMLInputElement))
      throw new Error("Input element must be type of HTMLInputElement");
  }

  private emitEvents(){
    // this.updateMapObject(mapObject);
    this.placeSelected.emit(this.mapObject);
  }

  private handleMapMarkerAndNavigation(place: PlaceResult){
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
  }

  private onInputChange(ev){
    // this.userFriendlyAddress = this.inputElement.value;
    this.resetMapObject();
    // if (this.mapObject.userFriendlyAddress != null || this.mapObject.latLng != null){
      // this.updateMapObject(mapObject);
    // }
    this.placeSelected.emit(this.mapObject);
  }

  private onInputFocus(ev){
    this.inputElement.value = this.mapObject.userFriendlyAddress || '';
  }

  private onInputBlur(ev: Event){
    this.inputElement.value = this.mapObject.userFriendlyAddress || '';
  }

  resetMapObject(){
    this.mapObject.latLng = null;
    this.mapObject.userFriendlyAddress = null;
  }

  // private updateMapObject(mapObject: MapObject){
  //   if (this.mapObject == null)
  //     return;
  //
  //   this.mapObject.latLng = mapObject.latLng;
  //   this.mapObject.userFriendlyAddress = mapObject.userFriendlyAddress;
  // }
}
