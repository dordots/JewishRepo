import {NgModule} from '@angular/core';
import {PlaceAutoComplete} from "./place-autocomplete/place-autocomplete";
import { LocationPickerModalDirective } from './location-picker-modal/location-picker-modal';
import { NoScrollDirective } from './no-scroll/no-scroll';

@NgModule({
	declarations: [PlaceAutoComplete,
    LocationPickerModalDirective,
    NoScrollDirective],
	imports: [],
	exports: [PlaceAutoComplete,
    LocationPickerModalDirective,
    NoScrollDirective]
})
export class DirectivesModule {}
