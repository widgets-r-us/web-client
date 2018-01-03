import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WidgetEditComponent} from "./widget/widget-edit.component";
import {WidgetSearchComponent} from "./widget/widget-search.component";
import {WidgetDetailsComponent} from "./widget/widget-details.component";
import {OrderComponent} from "./order.component";
import {WidgetsRUsUserComponent} from "./widgets-r-us-user/widgets-r-us-user.component";
import {AuthComponent} from "./widgets-r-us-user/auth.component";
import {IfNotLoggedIn} from "./widgets-r-us-user/if-not-logged-in.guard";
import {IfLoggedIn} from "./widgets-r-us-user/if-logged-in-guard.guard";

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, canActivate: [IfNotLoggedIn]},
  {path: 'widget/search', component: WidgetSearchComponent, canActivate: [IfLoggedIn]},
  {path: 'widget/edit/:id', component: WidgetEditComponent, canActivate: [IfLoggedIn]},
  {path: 'widget/edit', component: WidgetEditComponent, canActivate: [IfLoggedIn]},
  {path: 'widget/:id', component: WidgetDetailsComponent, canActivate: [IfLoggedIn]},
  {path: 'order', component: OrderComponent, canActivate: [IfLoggedIn]},
  {path: 'user', component: WidgetsRUsUserComponent, canActivate: [IfLoggedIn]},
  {path: '**', redirectTo: '/auth', pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [
    {provide: IfLoggedIn, useClass: IfLoggedIn},
    {provide: IfNotLoggedIn, useClass: IfNotLoggedIn}
  ]
})
export class AppRoutingModule { }
