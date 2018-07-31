import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConfigProvider} from "../app-config/app-config";
import {AppConfig} from "../../common/models/common/app-config";
import {AppIcons} from "../../common/models/map-objects/app-icons";

const getIconsRootPath = (config: AppConfig) => `${config.assetsPaths.basePath}/${config.assetsPaths.iconsRelativePath}`;
const getIconPath = (config: AppConfig, iconFileName: string) => `${getIconsRootPath(config)}/${iconFileName}`;

@Injectable()
export class AppAssetsProvider {

  constructor(private http: HttpClient,
              private appConfig: AppConfigProvider) {
    console.log('Hello AppAssetsProvider Provider');
  }

  async getIconPath(name: string): Promise<string> {
    let config = await this.appConfig.config.toPromise();
    return getIconPath(config, AppIcons[name]);
  }
}
