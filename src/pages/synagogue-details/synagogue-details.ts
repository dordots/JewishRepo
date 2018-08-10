import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Synagogue} from "../../common/models/map-objects/synagogue";
import {EventBasedMapObjectProvider} from "../../providers/server-providers/event-based-map-object.provider";
import {Event} from "../../common/models/event/event";
import {DatePipe} from "@angular/common";

@IonicPage()
@Component({
  selector: 'page-synagogue-details',
  templateUrl: 'synagogue-details.html',
  providers: [DatePipe]
})
export class SynagogueDetailsPage {

  @Input() synagogue: Synagogue;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private datePipe: DatePipe,
              private provider:  EventBasedMapObjectProvider) {
    this.initMockedSynagogue();
  }

  async initMockedSynagogue(){
    this.synagogue = await this.provider.getById(EventBasedMapObjectProvider.mockedId, Synagogue);
    console.log(this.synagogue);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynagogueDetailsPage');
  }

  formatTimeRange(event: Event){
    return event.formatTimeRange(this.datePipe);
  }
}
