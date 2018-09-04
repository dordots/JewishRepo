import {NgModule} from '@angular/core';
import {PlaceAutoComplete} from "./place-autocomplete/place-autocomplete";
import { LocationPickerModalDirective } from './location-picker-modal/location-picker-modal';

@NgModule({
	declarations: [PlaceAutoComplete,
    LocationPickerModalDirective],
	imports: [],
	exports: [PlaceAutoComplete,
    LocationPickerModalDirective]
})
export class DirectivesModule {}
