import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "../widgets-r-us-user/widgets-r-us-user.service";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {WidgetCategory} from "../models";

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
export class WidgetCategoryComponent {

  @Input() widgetCategory: WidgetCategory

  categories: any

  constructor(private widgetService: WidgetService, @Inject(FormBuilder) private formBuilder: FormBuilder) {
  }

}
