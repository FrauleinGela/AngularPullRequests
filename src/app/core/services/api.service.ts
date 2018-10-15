import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  get(path: string, _params?: any): Observable<any> {
    const params = this.setParams(_params);
    return this.http.get(`${environment.apiUrl}${path}`, { params });
  }
  // Needed to have a full response for pagination, github API sends HEADERS response
  getFullResponse(path: string, _params?: any): Observable<any> {
    const params = this.setParams(_params);
    return this.http.get(`${environment.apiUrl}${path}`, { params, observe: 'response' });
  }

  setParams(params) {
    let httpParams = new HttpParams();
    const has = Object.prototype.hasOwnProperty;
    for (const key in params) {
      if (has.call(params, key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }
  // TODO: Here it may be able to add more Restful API methods
}
