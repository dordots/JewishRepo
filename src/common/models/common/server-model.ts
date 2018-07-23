export interface ServerModel {
  toServerModel(): any;
  fromServerModel(serverModel: any);
}
