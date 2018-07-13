import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrayerVersion} from "../../models/common/enums";

@Component({
  selector: 'fk-prayer-version-options',
  templateUrl: 'prayer-version-options.html'
})
export class PrayerVersionOptionsComponent {

  @Input()
  multiple: boolean;

  @Input()
  title: string;

  @Input()
  placeholder: string;

  @Input()
  initSelectionIndex: number;

  @Input()
  versions: string[];

  @Output()
  onVersionSelected: EventEmitter<string | string[]>;

  selectedVersion: string | string[];

  constructor() {
    console.log('Hello PrayerVersionOptionsComponent Component');
    this.title = 'בחר נוסח תפילה';
    this.versions = Object.keys(PrayerVersion).map(key => PrayerVersion[key]);
    this.initSelectionIndex = 0;
    this.selectedVersion = this.versions[this.initSelectionIndex];
    this.onVersionSelected = new EventEmitter<string|string[]>();
  }

  onSelectionChanged(selection){
    console.log(selection);
  }
}
