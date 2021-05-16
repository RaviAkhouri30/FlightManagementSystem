import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css']
})
export class ModifyFlightComponent implements OnInit {

  public modifyFlight!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public createForm = (): void => {
    this.modifyFlight = this.fb.group({
      providerName: [''],
      providerCode: [''],
      providerType: ['']
    });
  }

}
