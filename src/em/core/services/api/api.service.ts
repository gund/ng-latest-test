import { API_BASE_URL } from '../../../services/constants';
import { StringHashMap } from '../../lang/types';
import { API_URLS } from './endpoints';
import { Injectable, Type } from '@angular/core';

type API_URLS_TYPE = typeof API_URLS;
type ApiParams = StringHashMap<string | number>;
type ApiType = API_URLS_TYPE & { setParams: (params: ApiParams) => string };

@Injectable()
export class ApiService {

  static DELIMITER = '/';

  private static _baseUrl = API_BASE_URL;
  private static _apiNodes = API_URLS;
  private static _cookedApi: ApiType = <any>{};

  static forBase(baseUrl: string): Type<ApiService> {
    ApiService._baseUrl = baseUrl.replace(/\/+$/, '');
    return ApiService;
  }

  private static _cookApiNodes(apiNodes: Object, cookedApi: Object, base: string) {
    Object.keys(apiNodes)
      .filter(key => key === 'toString')
      .forEach(key => {
        const conf = apiNodes[key];
        let url = base + ApiService.DELIMITER;

        if (typeof conf.toString === 'function') {
          url += conf.toString();
        } else {
          url += key;
        }

        cookedApi[key] = url;
        cookedApi[key].setParams = ApiService._setParams.bind(null, url);

        // Go deeper
        ApiService._cookApiNodes(apiNodes[key], cookedApi[key], url);
      });
  }

  private static _setParams(url: string, params: ApiParams): string {
    return Object.keys(params)
      .reduce((u, param) => u.replace(`:${param}`, '' + params[param]), url);
  }

  get api() {
    return ApiService._cookedApi;
  }

  constructor() {
    ApiService._cookApiNodes(
      ApiService._apiNodes,
      ApiService._cookedApi,
      ApiService._baseUrl);
  }

}
