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
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DbServiceService } from './db-service/db-service.service';
import { ApiService } from './common/api.service';

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
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DbServiceService)
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
