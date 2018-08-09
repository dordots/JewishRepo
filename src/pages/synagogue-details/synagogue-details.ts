import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-synagogue-details',
  templateUrl: 'synagogue-details.html',
  styleUrls: ['synagogue-details.scss']
})
export class SynagogueDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynagogueDetailsPage');
  }

}
