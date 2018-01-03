import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "../widgets-r-us-user/widgets-r-us-user.service";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'new-widget-category',
  template:`
    <form [formGroup]="widgetCategory" (ngSubmit)="createWidgetCategoryOrOption()">
      <mat-form-field>
        <input matInput formControlName="name" placeholder="Category name"/>
      </mat-form-field>
      <button mat-icon-button (click)="createWidgetCategoryOrOption()"><mat-icon>add</mat-icon></button>
    </form>
  `,
  styles: [`
  `]
})
export class NewWidgetCategoryComponent {

  widgetCategory: FormGroup
  name = new FormControl('', Validators.required)

  categories: any

  constructor(private widgetsRUsUserService: WidgetsRUsUserService, private widgetService: WidgetService,
              @Inject(FormBuilder) private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document) {
    this.widgetCategory = this.formBuilder.group({
      'name': this.name
    })
  }

  createWidgetCategoryOrOption() {
    this.widgetService.createWidgetCategory(this.name.value).subscribe(response => {
      console.log(response)
    })
  }



}
