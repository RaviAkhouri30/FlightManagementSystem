import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { ModifyFlightComponent } from './modify-flight/modify-flight.component';
import { DeleteFlightComponent } from './delete-flight/delete-flight.component';
import { ViewFlightComponent } from './view-flight/view-flight.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFlightComponent,
    ModifyFlightComponent,
    DeleteFlightComponent,
    ViewFlightComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
