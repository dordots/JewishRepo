import {Component, ComponentRef} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {EventBasedMapObject} from "../../common/models/map-objects/server-map-object";
import {SelectMapObjectComponent} from "../../components/select-map-object/select-map-object";
import {AbstractAddEventComponent} from "./components/abstract-add-event-component";
import {ServerModel} from "../../common/models/common/server-model";

export interface AddEventPageNavigationArgs {
  addEventComponentType: any;
  mapObject?: EventBasedMapObject&ServerModel;
}

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  addEventComponentType: any;
  addEventComponent: AbstractAddEventComponent;
  mapObject: EventBasedMapObject&ServerModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController) {
    let pageParams = this.navParams.data as AddEventPageNavigationArgs;
    this.mapObject = pageParams.mapObject;
    this.addEventComponentType = pageParams.addEventComponentType;
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
      this.addEventComponent.mapObject = this.mapObject;
      console.log(this.mapObject);
    });

    await modal.present();
  }

  getMapObjectById(id: string): Promise<EventBasedMapObject&ServerModel>{
    return this.addEventComponent.mapObjectProvider.getById(id, this.addEventComponent.mapObjectType);
  }

  onAddEventComponentCreated(compRef: ComponentRef<AbstractAddEventComponent>) {
    this.addEventComponent = compRef.instance;
    this.addEventComponent.formSubmitted.subscribe(async (event) => {
      this.mapObject.events.push(event);
      await this.addEventComponent.mapObjectProvider.update(this.mapObject);
      console.log("update done successfully");
    });
  }
}
