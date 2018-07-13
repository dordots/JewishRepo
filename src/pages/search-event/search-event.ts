import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BasicEventQuery} from "../../models/query-forms/basic-event-query";
import {SearchableEvent, SearchableEvents} from "../../models/event/event";

@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  basicEventQuery: BasicEventQuery;
  eventFormGroup: FormGroup;
  searchableEvents: Array<SearchableEvent>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.basicEventQuery = {} as any;
    this.searchableEvents = SearchableEvents;
    this.initEventFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
  }

  private initEventFormGroup(){
    this.eventFormGroup = this.formBuilder.group({});
  }

}
