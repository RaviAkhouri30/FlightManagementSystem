import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../common/api.service';
import { FlightDataModel } from '../create-flight/model/flight-data-model';

@Component({
  selector: 'app-delete-flight',
  templateUrl: './delete-flight.component.html',
  styleUrls: ['./delete-flight.component.css']
})
export class DeleteFlightComponent implements OnInit {

  public deleteFlight!: FormGroup;

  private flightData: FlightDataModel[] = [];
  private providerCodePlaceholder: string;
  private showInvalid: boolean;
  private showSuccess: boolean;

  @Output() navigateToHome = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private apiCall: ApiService
  ) {
    this.providerCodePlaceholder = '';
    this.showInvalid = false;
    this.showSuccess = false;
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.getFlightDataFromApi();
    this.getProviderCode();
  }

  public createForm = (): void => {
    this.deleteFlight = this.fb.group({
      providerCode: ['', Validators.required],
      providerType: ['', Validators.required]
    });
  }


  public getFlightDataFromApi = async (): Promise<void> => {
    await this.apiCall.getData().toPromise().then((res) => {
      if (res) {
        this.setFlightData(res);
      }
    });
  }

  public getProviderCode = (): void => {
    this.getFlightData().forEach((element: FlightDataModel, index: number) => {
      if (index === (this.getFlightData().length - 1)) {
        this.providerCodePlaceholder = this.providerCodePlaceholder + ' ' + element.providerCode;
        return;
      }
      this.providerCodePlaceholder = this.providerCodePlaceholder + element.providerCode + ' or';
    });
  }

  public getFlightData(): FlightDataModel[] {
    return this.flightData;
  }

  public setFlightData(flightData: FlightDataModel[]): void {
    this.flightData = flightData;
  }

  public getProviderCodePlaceholder(): string {
    return this.providerCodePlaceholder;
  }

  public setProviderCodePlaceholder(providerCodePlaceholder: string): void {
    this.providerCodePlaceholder = providerCodePlaceholder;
  }

  public isShowInvalid(): boolean {
    return this.showInvalid;
  }

  public setShowInvalid(showInvalid: boolean): void {
    this.showInvalid = showInvalid;
  }

  public isShowSuccess(): boolean {
    return this.showSuccess;
  }

  public setShowSuccess(showSuccess: boolean): void {
    this.showSuccess = showSuccess;
  }

  public onDeleteFlight = (): void => {

    this.deleteFlight.markAllAsTouched();
    if (this.deleteFlight.invalid) {
      return;
    }

    const param: FlightDataModel = this.deleteFlight.getRawValue();

    if (!param.providerCode) {
      this.deleteFlight.controls.providerName.setErrors({ invalid: 'invalidFlightName' });
      return;
    }

    if (param.providerType !== 'Domestic' && param.providerType !== 'International') {
      this.deleteFlight.controls.providerType.setErrors({ invalid: 'invalidFlightName' });
    }

    const temp =
      this.getFlightData().find(e => e.providerCode === param.providerCode && e.providerType === param.providerType)?.providerName;

    if (!temp) {
      this.setShowInvalid(true);
      setTimeout(() => {
        this.setShowInvalid(false);
      }, 2500);
      return;
    }

    this.apiCall.deleteData(param.providerCode).subscribe(res => {
      this.setShowSuccess(true);
      setTimeout(() => {
        this.setShowSuccess(false);
        this.navigateToHome.emit();
      }, 1000);
    }, err => {
      console.log(err);
    });

  }

}
