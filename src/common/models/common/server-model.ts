import {cloneDeep, merge} from "lodash-es";
import moment = require("moment");

export abstract class ServerModel {

  dateMembers = [];

  toServerModel(){
    let model = cloneDeep(this) as any;
    model.dateMembers.forEach(m => {
      if (model[m] == null)
        return;
      if (model[m] instanceof Date)
        model[m] = model[m].getTime();
      else if (moment(model[m]).isValid()){
        model[m] = moment(model[m]).get('ms');
      }
    });
    return model;
  }

  fromServerModel(model: any){
    merge(this, model);
    this.dateMembers.forEach(m => {
      this[m] = model[m] && moment(model[m]).toDate()
    });
    return this;
  }
}
