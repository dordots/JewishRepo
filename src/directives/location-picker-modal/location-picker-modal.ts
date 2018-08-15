import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {MapObject} from "../../common/models/map-objects/server-map-object";
import {LocationPickerComponent} from "../../components/location-picker/location-picker";
import {ModalController} from "ionic-angular";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";

@Directive({
  selector: '[fkLocationPickerModal]',
  providers: [MakeProvider(LocationPickerModalDirective)]
})
export class LocationPickerModalDirective extends AbstractValueAccessor {

  @Output() public modalClosed: EventEmitter<MapObject>;

  constructor(private modalCtrl: ModalController) {
    super();
    console.log('Hello LocationPickerModalDirective Directive');
    this.modalClosed = new EventEmitter<MapObject>();
  }

  openMapLocationPicker(){
    const modal = this.modalCtrl.create(LocationPickerComponent);
    modal.onDidDismiss((data: MapObject) => {
      this.updateNgModel(data);
      this.modalClosed.emit(data);
    });
    modal.present();
  }

  @HostListener('click') onClick(){
    this.openMapLocationPicker();
  }

  private updateNgModel(data:MapObject){
    if (data == null){
      this.value.userFriendlyAddress = null;
      this.value.latLng = null;
    }
    else{
      this.value.userFriendlyAddress = data.userFriendlyAddress;
      this.value.latLng = data.latLng;
    }
  }
}
