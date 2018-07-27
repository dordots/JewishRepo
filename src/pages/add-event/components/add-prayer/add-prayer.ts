import {Component, Input} from '@angular/core';
import {PrayerEvent} from "../../../../common/models/event/prayer-event";
import {Synagogue} from "../../../../common/models/map-objects/synagogue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "ionic-angular";
import {EventBasedMapObjectProvider} from "../../../../providers/server-providers/event-based-map-object.provider";
import {AbstractAddEvent} from "../abstract-add-event";

@Component({
  selector: 'fk-add-prayer',
  templateUrl: 'add-prayer.html'
})
export class AddPrayerComponent extends AbstractAddEvent{

  @Input()
  synagogue: Synagogue;

  prayer: PrayerEvent;
  prayerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private synagogueProvider: EventBasedMapObjectProvider) {
    super(synagogueProvider, Synagogue);
    console.log('Hello AddPrayerComponent Component');
    this.prayer = {} as any;
    this.initForm();
  }

  initForm(){
    this.prayerForm = this.formBuilder.group({
      "nosach": ['', [Validators.required]],
      "name": ['',[Validators.required]]
    });
  }

  // async openSelectMapObjectModal(){
  //   const modal = this.modalCtrl.create(SelectMapObjectComponent);
  //   modal.onDidDismiss(async (id) => {
  //     if (id == null)
  //       return;
  //
  //     this.synagogue = await this.synagogueProvider.getById(id);
  //     console.log(this.synagogue);
  //   });
  //   await modal.present();
  // }
}
