import {Component, Input, ViewChild} from '@angular/core';
import {PrayerNosach} from "../../common/models/common/enums/prayer-nosach";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";
import {Select} from "ionic-angular";

@Component({
  selector: 'fk-prayer-version-options',
  templateUrl: 'prayer-version-options.html',
  providers: [MakeProvider(PrayerVersionOptionsComponent)]
})
export class PrayerVersionOptionsComponent extends AbstractValueAccessor{

  @ViewChild('selectComponent') private selectComponent: Select;

  @Input()
  allowMultiple: boolean;

  @Input()
  title: string = "בחר נוסח תפילה";

  @Input()
  placeholder: string = "בחר נוסח";

  @Input()
  label: string;

  @Input()
  versions: string[];

  selectedVersion: string | string[];

  constructor() {
    super();
    console.log('Hello PrayerVersionOptionsComponent Component');

    this.versions = Object.keys(PrayerNosach).map(key => PrayerNosach[key]);
  }

  ngAfterViewInit(){
    this.selectComponent.okText = "בחר";
    this.selectComponent.cancelText = "בטל";
  }

  onSelectionChanged(selection){
    this.selectedVersion = selection;
  }
}
