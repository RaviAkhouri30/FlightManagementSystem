import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../common/api.service';
import { FetchProviderCode } from '../common/fetch-provider-code';
import { FlightDataModel } from './model/flight-data-model';
@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  public createFlight!: FormGroup;
  private fetchProviderCode: FetchProviderCode = new FetchProviderCode();
  @Output() navigateToHome = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private apiCall: ApiService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm = (): void => {
    this.createFlight = this.fb.group({
      providerName: ['', Validators.required],
      providerCode: [''],
      providerType: ['', Validators.required]
    });
    console.log(this.createFlight);
  }

  public patchProviderName = (data: string): void => {
    this.createFlight.get('providerCode')?.setValue(data);
  }

  public onProviderName = (): void => {
    this.el.nativeElement.querySelector('#ProviderType').focus();
    const formData = this.createFlight.getRawValue();
    const providerCode = this.fetchProviderCode.fetchProviderCode(formData.providerName);
    this.patchProviderName(providerCode);
  }

  public onInsertFlight = (): void => {
    const param: FlightDataModel = this.createFlight.getRawValue();

    this.createFlight.markAllAsTouched();

    if (!param.providerCode) {
      this.createFlight.controls.providerName.setErrors({ invalid: 'invalidFlightName' });
      return;
    }
    if (this.createFlight.invalid) {
      return;
    }
    if (param.providerType !== 'Domestic' && param.providerType !== 'International') {
      this.createFlight.controls.providerType.setErrors({ invalid: 'invalidFlightName' });
    }

    this.apiCall.createData(param).subscribe((res) => {
      this.navigateToHome.emit('');
    }, err => {
      console.log(err);
    });
  }

}
