import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LOCAL_WRU_API_URL, WRU_API_URL_TOKEN} from "./injection-tokens";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WidgetsRUsStyleModule} from "./widgets-r-us-style.module";
import {RegisterComponent} from "./widgets-r-us-user/register.component";
import {LoginComponent} from "./widgets-r-us-user/login.component";
import {WidgetsRUsUserService} from "./widgets-r-us-user/widgets-r-us-user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WidgetEditComponent} from "./widget/widget-edit.component";
import {WidgetService} from "./widget/widget.service";
import {WruHeaderComponent} from "./wru-header.component";
import {WidgetCategoriesComponent} from "./widget/widget-categories.component";
import { AppRoutingModule } from './/app-routing.module';
import {WidgetSearchComponent} from "./widget/widget-search.component";
import {AuthComponent} from "./widgets-r-us-user/auth.component";
import {WidgetDetailsComponent} from "./widget/widget-details.component";
import {OrderComponent} from "./order.component";
import {WidgetsRUsUserComponent} from "./widgets-r-us-user/widgets-r-us-user.component";
import {RouterModule} from "@angular/router";
import {WidgetCategoryOptionComponent} from "./widget/widget-category-option.component";
import {NewWidgetCategoryComponent} from "./widget/new-widget-category.component";
import {ComponentLoader} from "./component-loader";
import {WidgetAttributesComponent} from "./widget/widget-attributes.component";
import {NewWidgetAttributeComponent} from "./widget/new-widget-attribute.component";
import {WidgetAttributeComponent} from "./widget/widget-attribute.component";
import {WidgetCategoryComponent} from "./widget/widget-category.component";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    WidgetsRUsUserComponent,
    WidgetCategoryComponent,
    NewWidgetCategoryComponent,
    WidgetCategoryOptionComponent,
    WidgetCategoriesComponent,
    NewWidgetAttributeComponent,
    WidgetAttributeComponent,
    WidgetAttributesComponent,
    WidgetSearchComponent,
    WidgetDetailsComponent,
    WidgetEditComponent,
    OrderComponent,
    WruHeaderComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    WidgetsRUsStyleModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: WRU_API_URL_TOKEN, useValue: LOCAL_WRU_API_URL},
    ComponentLoader,
    WidgetsRUsUserService,
    WidgetService
  ],
  entryComponents: [
    NewWidgetCategoryComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
