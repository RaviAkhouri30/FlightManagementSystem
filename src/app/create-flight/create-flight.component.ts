import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchProviderCode } from '../common/fetch-provider-code';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  public createFlight!: FormGroup;
  private fetchProviderCode: FetchProviderCode = new FetchProviderCode();

  constructor(
    private fb: FormBuilder,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm = (): void => {
    this.createFlight = this.fb.group({
      providerName: [''],
      providerCode: [''],
      providerType: ['']
    });
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

}
