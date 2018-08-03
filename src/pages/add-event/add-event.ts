import {Component, ComponentRef} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {EventBasedMapObject} from "../../common/models/map-objects/server-map-object";
import {AbstractAddEventComponent} from "./components/abstract-add-event-component";
import {ServerModel} from "../../common/models/common/server-model";
import {AddPrayerComponent} from "./components/add-prayer/add-prayer";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";

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
  errors: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mapObjectProvider: EventBasedMapObjectProvider,
              private modalCtrl: ModalController) {
    let pageParams = this.navParams.data as AddEventPageNavigationArgs;
    this.mapObject = pageParams.mapObject;

    // todo: remove the HARD-CODED "AddPrayerComponent" below
    this.addEventComponentType = pageParams.addEventComponentType || AddPrayerComponent;
    this.errors = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  async openSelectMapObject() {
    this.mapObject = await this.getMapObjectById("5b5468974f46c65fa709efcb");
    this.addEventComponent.mapObject = this.mapObject;
    // const modal = this.modalCtrl.create(SelectMapObjectComponent);
    // modal.onDidDismiss(async (id) => {
    //   if (id == null)
    //     return;
    //   this.mapObject = await this.getMapObjectById(id);
    //   this.addEventComponent.mapObject = this.mapObject;
    //   console.log(this.mapObject);
    // });
    //
    // await modal.present();
  }

  getMapObjectById(id: string): Promise<EventBasedMapObject&ServerModel>{
    return this.mapObjectProvider.getById(id, this.addEventComponent.mapObjectType);
  }

  async onAddEventComponentCreated(compRef: ComponentRef<AbstractAddEventComponent>) {
    this.addEventComponent = compRef.instance;
    this.addEventComponent.formSubmitted.subscribe(async (event) => {
      this.errors = [];
      if (this.mapObject.isEventExist(event)){
        this.errors.push('Such event is already exists');
        return;
      }
      this.mapObject.events.push(event);
      await this.addEventComponent.mapObjectProvider.update(this.mapObject);
      console.log("update done successfully");
    });
  }
}
