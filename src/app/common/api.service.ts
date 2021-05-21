import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightDataModel } from '../create-flight/model/flight-data-model';
import { apiConstant } from './api-constant/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private id = 0;

  constructor(
    private httpClient: HttpClient
  ) { }

  public getData = (): Observable<any> => {
    return this.httpClient.get(environment.base_url + apiConstant.FLIGHTS);
  }

  public getDataById = (id: string): Observable<object> => {
    return this.httpClient.get(environment.base_url + apiConstant.FLIGHTS + '/' + id);
  }

  public createData = (param: FlightDataModel): Observable<object> => {
    param.id = param.providerCode;
    return this.httpClient.post(environment.base_url + apiConstant.FLIGHTS, param);
  }

  public deleteData = (id: string): Observable<object> => {
    return this.httpClient.delete(environment.base_url + apiConstant.FLIGHTS + '/' + id);
  }

  public updateData = (param: FlightDataModel): Observable<any> => {
    param.id = param.providerCode;
    return this.httpClient.put(environment.base_url + apiConstant.FLIGHTS + '/' + param.id, param);
  }

}
