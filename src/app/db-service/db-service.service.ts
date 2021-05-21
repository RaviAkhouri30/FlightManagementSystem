import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { FlightDataModel } from '../create-flight/model/flight-data-model';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService implements InMemoryDbService {

  constructor() { }

  public createDb = (): {} => {
    const flights: FlightDataModel[] = [];
    return { flights };
  }

}
