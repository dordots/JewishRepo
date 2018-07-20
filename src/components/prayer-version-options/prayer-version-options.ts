import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrayerNosach} from "../../common/models/common/enums/prayer-nosach";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";

@Component({
  selector: 'fk-prayer-version-options',
  templateUrl: 'prayer-version-options.html',
  providers: [MakeProvider(PrayerVersionOptionsComponent)]
})
export class PrayerVersionOptionsComponent extends AbstractValueAccessor{

  @Input()
  allowMultiple: boolean;

  @Input()
  title: string = "בחר נוסח תפילה";

  @Input()
  placeholder: string = "בחר נוסח";

  @Input()
  versions: string[];

  @Input()
  label: string;

  selectedVersion: string | string[];

  constructor() {
    super();
    console.log('Hello PrayerVersionOptionsComponent Component');
    this.versions = Object.keys(PrayerNosach).map(key => PrayerNosach[key]);
  }

  onSelectionChanged(selection){
    this.selectedVersion = selection;
  }
}
