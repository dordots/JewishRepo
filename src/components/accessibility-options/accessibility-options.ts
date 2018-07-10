import {Component, Input} from '@angular/core';
import {AccessibilityOption} from "../../models/common/accessibility";

@Component({
  selector: 'fk-accessibility-options',
  templateUrl: 'accessibility-options.html'
})
export class AccessibilityOptionsComponent {

  accessibilityList: string[];
  selectionModel: {[accessibility: string]: boolean};


  constructor() {
    console.log('Hello AccessibilityOptionsComponent Component');
    this.accessibilityList = Object.keys(AccessibilityOption);
    this.selectionModel = {};
  }

  onSelectionChanged(){
    this.selections;
  }

  get selections(): Array<AccessibilityOption> {
    return Object.keys(this.selectionModel)
                 .filter(selection => this.selectionModel[selection])
                 .map(selection => AccessibilityOption[selection]);
  }
}
