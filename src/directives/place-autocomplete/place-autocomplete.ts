import {
  AfterContentInit, ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output, SkipSelf
} from '@angular/core';
import {GoogleMapProvider} from "../../providers/google-map/google-map-provider";
import {MapObject, ServerMapObject} from "../../common/models/map-objects/server-map-object";
import Autocomplete = google.maps.places.Autocomplete;
import PlaceResult = google.maps.places.PlaceResult;
import {FormControl, NgControl,} from "@angular/forms";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";

@Directive({
  selector: '[fkPlaceAutoComplete]',
  providers: [NgControl as any, MakeProvider(PlaceAutoComplete)]
})
export class PlaceAutoComplete extends AbstractValueAccessor implements AfterContentInit, OnDestroy {
  private _inputElement: HTMLInputElement;
  private previousSelectedMapObject: MapObject;

  @Input() set inputElement(v) {
    if (v != null) {
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

  @Input() formControl: FormControl;

  @Input() toMarkerSelectedPlace: boolean = false;

  @Output() placeSelected: EventEmitter<MapObject>;

  autoComplete: Autocomplete;
  marker: google.maps.Marker;

  constructor(private googleMapProvider: GoogleMapProvider,
              private el: ElementRef,
              @SkipSelf() private changeDetectRef: ChangeDetectorRef) {
    super();
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
    this.inputElement.removeEventListener("focus", this.onInputFocus.bind(this));
    this.inputElement.removeEventListener("blur", this.onInputBlur.bind(this));
  }

  private validateElementIsHTMLInputElement(el) {
    if (!(el instanceof HTMLInputElement))
      throw new Error("Input element must be type of HTMLInputElement");
  }

  private registerToInputElementEvents() {
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

      this.previousSelectedMapObject = {
        latLng: this.value.latLng,
        userFriendlyAddress: this.value.userFriendlyAddress
      };

      this.updateNgModel(place);
      this.updateFormControl();


      this.emitEvents();
      this.handleMapMarkerAndNavigation(place);
    });
  }

  private updateNgModel(place: PlaceResult) {
    if (this.value == null)
      return;
    this.value.userFriendlyAddress = this.inputElement.value;
    this.value.latLng = place.geometry.location.toJSON();
  }

  private emitEvents() {
    this.placeSelected.emit(this.value);
  }

  private handleMapMarkerAndNavigation(place: PlaceResult) {
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

  /**
   * Used for set the input value to the `userFriendlyAddress` because it always is being reset.
   */
  private onInputFocus() {
    if (this.inputElement.value != '')
      this.inputElement.value = this.value.userFriendlyAddress || '';
  }

  /**
   * Used for set the input value to the `userFriendlyAddress` because it always is being reset.
   */
  private onInputBlur() {
    if (this.value.userFriendlyAddress == null)
      this.inputElement.value = '';
    else
      this.inputElement.value = this.value.userFriendlyAddress;
  }

  private updateFormControl() {
    if (this.formControl) {
      this.formControl.updateValueAndValidity({onlySelf: false, emitEvent: true});
      this.changeDetectRef.detectChanges();
    }
  }
}
