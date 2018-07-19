import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrayerNosach} from "../../models/common/enums/prayer-nosach";

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
    this.versions = Object.keys(PrayerNosach).map(key => PrayerNosach[key]);
    this.initSelectionIndex = 0;
    this.selectedVersion = this.versions[this.initSelectionIndex];
    this.onVersionSelected = new EventEmitter<string|string[]>();
  }

  onSelectionChanged(selection){
    console.log(selection);
  }
}
