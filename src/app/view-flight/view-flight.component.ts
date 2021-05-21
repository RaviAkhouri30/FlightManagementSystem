import { Component, OnInit } from '@angular/core';
import { ApiService } from '../common/api.service';
import { FlightDataModel } from '../create-flight/model/flight-data-model';

@Component({
  selector: 'app-view-flight',
  templateUrl: './view-flight.component.html',
  styleUrls: ['./view-flight.component.css']
})
export class ViewFlightComponent implements OnInit {

  private flightData: FlightDataModel[] = [];

  constructor(
    private apiCall: ApiService
  ) { }

  ngOnInit(): void {
    this.getFlightDataFromApi();
  }

  public getFlightDataFromApi = (): void => {
    this.apiCall.getData().subscribe((res) => {
      if (res) {
        this.setFlightData(res);
      }
    });
  }

  public getFlightData(): FlightDataModel[] {
    return this.flightData;
  }

  public setFlightData(flightData: FlightDataModel[]): void {
    this.flightData = flightData;
  }

}
