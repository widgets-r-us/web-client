import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LOCAL_WRU_API_URL, WRU_API_URL_TOKEN} from "./injection-tokens";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WidgetsRUsStyleModule} from "./widgets-r-us-style.module";
import {RegisterComponent} from "./register.component";
import {LoginComponent} from "./login.component";
import {WidgetsRUsUserService} from "./widgets-r-us-users.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    WidgetsRUsStyleModule,
  ],
  providers: [
    {provide: WRU_API_URL_TOKEN, useValue: LOCAL_WRU_API_URL},
    WidgetsRUsUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
