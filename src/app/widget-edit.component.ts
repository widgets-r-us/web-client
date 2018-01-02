import {Component, OnInit} from "@angular/core";
import {WidgetsRUsUserService} from "./widgets-r-us-users.service";
import {WidgetService} from "./widget.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'widget-edit',
  template:`
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
    <form [formGroup]="widgetEditForm" (ngSubmit)="saveWidget()" class="widget-edit-form">
      <mat-form-field>
        <input matInput type="text" class="full-width" formControlName="name" placeholder="Widget name"/>
      </mat-form-field>
      <div id="rootCategoriesElement"></div>
      <br/>
      <button mat-raised-button color="warn" style="text-align: center;">Cancel</button>
      <button type="submit" mat-raised-button color="primary" style="text-align:center">Save</button>
    </form>
  `,
  styles: [`
  `]
})
export class WidgetEditComponent implements OnInit {

  widgetEditForm: FormGroup

  categories: any

  constructor(private widgetsRUsUserService: WidgetsRUsUserService, private widgetService: WidgetService) {
    widgetService.getWidgetCategoriesAndOptions().subscribe(response => {
      this.categories = response
    })
  }

  recursivelyGenerateCategoriesHtml(categories, html) {
    for (const category of categories) {
      // create element and add content
      let htmlCategory = document.createElement('div')
      htmlCategory.textContent = category.widgetCategory

      // append this element to the passed in html element
      html.appendChild(htmlCategory)

      // then call this function recursively on all this category's children (assuming it has children).
      if (category.children)
        this.recursivelyGenerateCategoriesHtml(category.children, htmlCategory)
    }
    let addCategoryInput = document.createElement('input')
    addCategoryInput.placeholder = 'inCategory'
    html.appendChild(addCategoryInput)
  }

  generateCategoriesHtml() {
    console.log(this.categories)
    this.recursivelyGenerateCategoriesHtml(this.categories.root, document.getElementById('rootCategoriesElement'))
  }

  ngOnInit(): void {
    this.generateCategoriesHtml()
  }

}
