import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import {GoogleMapProvider} from "../providers/google-map/google-map";
@NgModule({
	declarations: [GoogleMapComponent],
	imports: [],
  providers: [GoogleMapProvider],
	exports: [GoogleMapComponent]
})
export class ComponentsModule {}
