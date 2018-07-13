import {Component, Input} from '@angular/core';
import {Accessibility} from "../../models/common/enums";

@Component({
  selector: 'fk-accessibility-options',
  templateUrl: 'accessibility-options.html'
})
export class AccessibilityOptionsComponent {

  accessibilityList: string[];

  @Input()
  selections: string[];

  constructor() {
    console.log('Hello AccessibilityOptionsComponent Component');
    this.accessibilityList = Object.keys(Accessibility).map(key => Accessibility[key]);
    this.selections = [];
  }

  isAccessibilityChecked(accessibility: string){
    return this.selections.indexOf(accessibility) != -1;
  }

  onSelectionChanged(accessibility: string) {
    if (!this.isAccessibilityChecked(accessibility))
      this.selections.push(accessibility);
    else{
      let index = this.selections.indexOf(accessibility);
      this.selections.splice(index,1);
    }
  }
}
