import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {NewWidgetCategoryComponent} from "./new-widget-category.component";
import {DynamicComponentLoader} from "../component-loader";

@Component({
  selector: 'widget-categories',
  template:`
    <div class="header"><strong>Add/Remove Categories</strong></div>
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
    <template #rootCategoriesElement></template>
  `,
  styles: [`
    .header {
      font-size: 16px;
      margin-bottom: 16px;
    }
    .error-message {
      color: red;
    }
  `]
})
export class WidgetCategoriesComponent implements AfterViewInit {

  @ViewChild('rootCategoriesElement', {read: ViewContainerRef}) rootCategoriesElement

  private errorMessage = ''

  constructor(private componentLoader: DynamicComponentLoader,
              private widgetService: WidgetService,
              @Inject(FormBuilder) private formBuilder: FormBuilder,
              @Inject(DOCUMENT) private document: Document,
              @Inject(ViewContainerRef) viewContainerRef) {
  }

/*  recursivelyGenerateCategoriesHtml(categories, html) {
    console.log('insideRecusiveCall: '+ html)
    for (const category of categories) {
      // create element and add content
      let htmlCategory = this.document.createElement('div')
      htmlCategory.textContent = category.widgetCategoryName

      // append this element to the passed in html element
      html.appendChild(htmlCategory)

      // then call this function recursively on all this category's children (assuming it has children).
      if (category.children)
        this.recursivelyGenerateCategoriesHtml(category.children, htmlCategory)

      this.componentLoader.loadComponent(NewWidgetCategoryComponent)
    }

    this.componentLoader.loadComponent(NewWidgetCategoryComponent)
  }

  generateCategoriesHtml() {
    console.log(this.rootCategoriesElement)
    this.recursivelyGenerateCategoriesHtml(this.widgetService.widgetCategories.children, this.rootCategoriesElement._data.renderElement)
  }*/

  ngAfterViewInit(): void {
    this.componentLoader.setRootViewContainerRef(this.rootCategoriesElement)
    this.widgetService.getWidgetCategoriesAndOptions().subscribe(response => {
      if (response['error']) {
        this.errorMessage = 'Unable to load categories'
      } else {
        /*this.generateCategoriesHtml()*/
      }
    })
  }

}
