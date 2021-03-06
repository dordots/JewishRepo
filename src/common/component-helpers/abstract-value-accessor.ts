import {forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isEqual} from "lodash-es";
import {isArray} from "ionic-angular/util/util";

export abstract class AbstractValueAccessor implements ControlValueAccessor {
  protected _value: any = null;
  public get value(): any { return this._value; };
  public set value(v: any) {
    if (!isEqual(v, this._value)) {
      if (isArray(v))
        v.forEach(val => this._value.push(val));
      else
        this._value = v;

      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
    // warning: comment below if only want to emit on user intervention
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

export function MakeProvider(type : any){
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
