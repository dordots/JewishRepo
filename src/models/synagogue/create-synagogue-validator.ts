import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Synagogue} from "./synagogue";

export const CreateSynagogueValidator = (synagogue: Synagogue): FormGroup => {
  return new FormGroup({
    name: new FormControl(synagogue.name, [Validators.required]),
    location: new FormControl(synagogue.location.latLng, [Validators.required]),
  });
};
