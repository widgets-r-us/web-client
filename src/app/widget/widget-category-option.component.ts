import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "../widgets-r-us-user/widgets-r-us-user.service";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'widget-edit',
  template:`
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
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

  widgetCategoryOptionForm: FormGroup
  widgetCategoryOptionName = new FormControl('', Validators.required)

  categories: any

  constructor(private widgetsRUsUserService: WidgetsRUsUserService, private widgetService: WidgetService,
              @Inject(FormBuilder) private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {
    this.widgetCategoryOptionForm = this.formBuilder.group({
      "widgetCategoryOptionName": this.widgetCategoryOptionName
    })
  }

  saveWidgetCategoryOption() {
  }



}
