import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../common/api.service';
import { FlightDataModel } from '../create-flight/model/flight-data-model';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css']
})
export class ModifyFlightComponent implements OnInit {

  public modifyFlight!: FormGroup;

  private flightData: FlightDataModel[] = [];
  private providerCodePlaceholder: string;
  private showInvalid: boolean;
  private recordExist: boolean;

  @Output() navigateToHome = new EventEmitter<string>();

  constructor(
    private apiCall: ApiService,
    private fb: FormBuilder
  ) {
    this.providerCodePlaceholder = '';
    this.showInvalid = false;
    this.recordExist = false;
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    await this.getFlightDataFromApi();
    this.getProviderCode();
  }

  public createForm = (): void => {
    this.modifyFlight = this.fb.group({
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

  public onUpdateFlight = (): void => {

    this.modifyFlight.markAllAsTouched();
    if (this.modifyFlight.invalid) {
      return;
    }

    const param: FlightDataModel = this.modifyFlight.getRawValue();

    if (!param.providerCode) {
      this.modifyFlight.controls.providerName.setErrors({ invalid: 'invalidFlightName' });
      return;
    }

    if (param.providerType !== 'Domestic' && param.providerType !== 'International') {
      this.modifyFlight.controls.providerType.setErrors({ invalid: 'invalidFlightName' });
    }

    const temp =
      this.getFlightData().find(e => e.providerCode === param.providerCode && e.providerType === param.providerType)?.providerName;
    if (temp) {
      this.setShowInvalid(true);
      setTimeout(() => {
        this.setShowInvalid(false);
      }, 2500);
    }

    const tempData =
      this.getFlightData().find(e => e.providerCode === param.providerCode);

    if (!tempData) {
      this.setRecordExist(true);
      setTimeout(() => {
        this.setRecordExist(false);
      }, 2500);
      return;
    }

    param.providerName = String(tempData?.providerName);

    this.apiCall.updateData(param).subscribe(res => {
      this.navigateToHome.emit();
    }, err => {
      console.log(err);
    });

  }

  public isShowInvalid(): boolean {
    return this.showInvalid;
  }

  public setShowInvalid(showInvalid: boolean): void {
    this.showInvalid = showInvalid;
  }

  public isRecordExist(): boolean {
    return this.recordExist;
  }

  public setRecordExist(recordExist: boolean): void {
    this.recordExist = recordExist;
  }

}
