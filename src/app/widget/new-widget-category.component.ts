import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "../widgets-r-us-user/widgets-r-us-user.service";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'new-widget-category',
  template:`
    <form [formGroup]="widgetCategoryForm" (ngSubmit)="createWidgetCategoryOrOption()">
      <mat-form-field>
        <input matInput formControlName="widgetCategoryName" placeholder="Category name"/>
      </mat-form-field>
      <button mat-icon-button (click)="createWidgetCategoryOrOption()">
        <mat-icon>add</mat-icon>
      </button>
    </form>
  `,
  styles: [`
  `]
})
export class NewWidgetCategoryComponent {

  widgetCategoryForm: FormGroup
  widgetCategoryName = new FormControl('', Validators.required)

  categories: any

  constructor(private widgetService: WidgetService, @Inject(FormBuilder) private formBuilder: FormBuilder) {
    this.widgetCategoryForm = this.formBuilder.group({
      "widgetCategoryName": this.widgetCategoryName
    })
  }

  createWidgetCategoryOrOption() {
    this.widgetService.createWidgetCategory(this.widgetCategoryName.value).subscribe(response => {
      console.log(response)
    })
  }

}
