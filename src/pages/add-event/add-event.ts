import {Component, ComponentRef} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {EventBasedMapObject} from "../../common/models/map-objects/server-map-object";
import {SelectMapObjectComponent} from "../../components/select-map-object/select-map-object";
import {AbstractAddEvent} from "./components/abstract-add-event";

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  addEventComponentType: any;
  addEventComponent: AbstractAddEvent;
  mapObject: EventBasedMapObject;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mapObjectProvider: EventBasedMapObject,
              private modalCtrl: ModalController) {
    /*optional*/ this.mapObject = this.navParams.get('mapObject');
    /*required*/ this.addEventComponent = this.navParams.get('addEventComponentType');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  async openSelectMapObject() {
    const modal = this.modalCtrl.create(SelectMapObjectComponent);
    modal.onDidDismiss(async (id) => {
      if (id == null)
        return;

      this.mapObject = await this.getMapObjectById(id);
      console.log(this.mapObject);
    });

    await modal.present();
  }

  getMapObjectById(id: string): Promise<EventBasedMapObject>{
    return this.addEventComponent.mapObjectProvider.getById(id, this.addEventComponent.mapObjectType);
  }

  onAddEventComponentCreated(compRef: ComponentRef<AbstractAddEvent>) {
    this.addEventComponent = compRef.instance;
  }
}
