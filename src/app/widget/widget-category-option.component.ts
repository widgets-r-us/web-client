import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "../widgets-r-us-user/widgets-r-us-user.service";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'widget-edit',
  template:`
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
    <div class="widget-edit-container">
      <form [formGroup]="widgetEditForm" (ngSubmit)="saveWidget()" class="widget-edit-form">
        <mat-form-field>
          <input matInput type="text" class="full-width" formControlName="name" placeholder="Widget name"/>
        </mat-form-field>
        <br/>
        <button mat-raised-button color="warn" style="text-align: center;">Cancel</button>
        <button type="submit" mat-raised-button color="primary" style="text-align:center">Save</button>
      </form>
      <span class="divider"></span>
      <widget-categories></widget-categories>
    </div>
  `,
  styles: [`
    .widget-edit-form {
      display: inline-block;
    }
    .divider {
      margin-left: 32px;
      margin-right: 32px;
    }
    widget-categories {
      display: inline-block;
    }
  `]
})
export class WidgetCategoryOptionComponent {

  widgetEditForm: FormGroup
  name = new FormControl('', Validators.required)

  categories: any

  constructor(private widgetsRUsUserService: WidgetsRUsUserService, private widgetService: WidgetService,
              @Inject(FormBuilder) private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {
    this.widgetEditForm = this.formBuilder.group({
      'name': this.name
    })
  }

  async saveWidget() {
    /*if (this.widgetService.exists(widgetId))
    this.widgetService.createWidget()*/
  }



}
