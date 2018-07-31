import {Component, Input} from '@angular/core';
import {Accessibility} from "../../common/models/common/enums/accessibility";
import {AbstractValueAccessor, MakeProvider} from "../../common/component-helpers/abstract-value-accessor";

@Component({
  selector: 'fk-accessibility-options',
  templateUrl: 'accessibility-options.html',
  providers: [MakeProvider(AccessibilityOptionsComponent)]
})
export class AccessibilityOptionsComponent extends AbstractValueAccessor{

  private accessibilityList: string[];
  private readonly selectedAccessibility: string[];

  constructor() {
    super();
    console.log('Hello AccessibilityOptionsComponent Component');
    this.accessibilityList = Object.keys(Accessibility).map(key => Accessibility[key]);
    this.selectedAccessibility = [];
  }

  isAccessibilityChecked(accessibility: string){
    return this.selectedAccessibility.indexOf(accessibility) != -1;
  }

  onSelectionChanged(accessibility: string) {
    if (!this.isAccessibilityChecked(accessibility)){
      this.selectedAccessibility.push(accessibility);
      this.value = this.selectedAccessibility;
    }
    else{
      let index = this._value.indexOf(accessibility);
      this.selectedAccessibility.splice(index,1);
      this.value = this.selectedAccessibility;
    }
  }
}
