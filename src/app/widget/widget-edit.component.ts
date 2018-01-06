import {AfterViewInit, Component, Inject, OnInit, ViewChild} from "@angular/core";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {WidgetCategory, WidgetCategoryOption} from "../models";

@Component({
  selector: 'widget-edit',
  template: `
    <div class="widget-edit-container">

      <form [formGroup]="widgetEditForm" (ngSubmit)="saveWidget()" class="widget-edit-form">
        <div class="header"><strong>Add/Edit Widget</strong></div>
        <div *ngIf="widgetErrorMessage" class="widget-error-message" [innerHTML]="widgetErrorMessage"></div>
        <mat-form-field>
          <input matInput type="text" class="full-width" formControlName="widgetName" placeholder="Widget name"/>
        </mat-form-field>
        <br/>

        <associated-widget-category-option *ngFor="let associatedOption of associatedWidgetCategoryOptions"
                                           [widgetCategoryOption]="associatedOption"></associated-widget-category-option>

        <add-widget-category-option-to-widget *ngIf="!sizeOptionAdded" [placeholder]="Size" [widgetCategory]="sizeWidgetCategory"
                                              [treeDepth]="rootTreeDepth"
                                              (selectedChild)="selectedSizeOption"></add-widget-category-option-to-widget>
        <button *ngIf="selectedSizeOption.widgetCategoryOptionName" mat-icon-button
                (click)="associateWidgetCategoryOptionWithWidget(selectedSizeOption)">
          <mat-icon>add</mat-icon>
        </button>

        <add-widget-category-option-to-widget *ngIf="!finishOptionAdded" [placeholder]="Finish" [widgetCategory]="finishWidgetCategory"
                                              [treeDepth]="rootTreeDepth"
                                              (selectedChild)="selectedFinishOption"></add-widget-category-option-to-widget>
        <button *ngIf="selectedFinishOption.widgetCategoryOptionName" mat-icon-button
                (click)="associateWidgetCategoryOptionWithWidget(selectedFinishOption)">
          <mat-icon>add</mat-icon>
        </button>

        <add-widget-category-option-to-widget *ngIf="!typeOptionAdded" [placeholder]="Type" [widgetCategory]="typeWidgetCategory"
                                              [treeDepth]="rootTreeDepth"
                                              (selectedChild)="selectedTypeOption"></add-widget-category-option-to-widget>
        <button *ngIf="selectedTypeOption.widgetCategoryOptionName" mat-icon-button
                (click)="associateWidgetCategoryOptionWithWidget(selectedTypeOption)">
          <mat-icon>add</mat-icon>
        </button>

        <add-widget-category-option-to-widget *ngIf="widgetCategoriesLessAlreadyAdded"
                                              [placeholder]="Add category" [widgetCategory]="widgetCategoriesLessAlreadyAdded"
                                              [treeDepth]="rootTreeDepth"
                                              (selectedChild)="selectedOption"></add-widget-category-option-to-widget>
        <button *ngIf="selectedOption.widgetCategoryOptionName" mat-icon-button
                (click)="associateWidgetCategoryOptionWithWidget(selectedOption)">
          <mat-icon>add</mat-icon>
        </button>

        <div class="associated-attributes" *ngIf="associatedWidgetAttributes">
          <mat-chip-list [@fadeIn]="" [@fadeOut]="">
            <mat-chip *ngFor="let associatedWidgetAttribute of associatedWidgetAttributes" color="primary"
                      (remove)="dissociateWidgetAttributeWithWidget(associatedWidgetAttribute)">
              {{associatedWidgetAttribute.widgetAttributeName}}
              <mat-icon matChipRemove>cancel</mat-icon>
            </mat-chip>
          </mat-chip-list>
        </div>

        <mat-form-field>
          <mat-select placeholder="Add attribute" [(value)]="selectedWidgetAttribute">
            <mat-option *ngFor="let widgetAttribute of widgetAttributesComponent.widgetAttributes"
                        [value]="widgetAttribute">{{widgetAttribute.widgetAttributeName}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-icon-button (click)="associateWidgetAttributeWithWidget($event)">
          <mat-icon>add</mat-icon>
        </button>

        <div style="margin: 8px 0;"></div>
        <mat-checkbox class="is-merchandise-checkbox" color="primary" [formControl]="isMerchandise">Is merchandise (will
          be listed on the store)
        </mat-checkbox>
        <br/>
        <div style="margin: 8px 0;"></div>
        <div *ngIf="isMerchandise.value">
          <div class="product-error-message">{{productErrorMessage}}</div>
          <mat-form-field>
            <input matInput type="text" class="full-width" formControlName="productName"
                   placeholder="Product name (what to list this item as in the store)"/>
          </mat-form-field>
          <br/>
          <mat-form-field>
            <span matPrefix>$ &nbsp;</span>
            <input matInput type="number" class="full-width" formControlName="price" placeholder="Price"/>
          </mat-form-field>
          <br/>
          <mat-form-field>
            <input matInput type="number" class="full-width" formControlName="quantity"
                   placeholder="Quantity (how many are in stock)"/>
          </mat-form-field>
        </div>
        <br/>
        <button class="cancel-button" mat-raised-button color="warn" (click)="cancelEdit()">Cancel</button>
        <button class="save-button" type="submit" mat-raised-button color="primary">Save</button>
      </form>

      <widget-categories #widgetCategoriesComponent></widget-categories>

      <widget-attributes #widgetAttributesComponent></widget-attributes>
    </div>
  `,
  styles: [`
    .widget-edit-container {
      margin-top: 128px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      transition: all 0.2s;
    }

    .header {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .widget-error-message {
      width: 256px;
      color: red;
    }

    .widget-edit-form {
      display: inline-block;
      vertical-align: top;
    }

    .associated-attributes {
      margin-bottom: 8px;
      width: 256px;
    }

    widget-categories {
      display: inline-block;
      vertical-align: top;
    }

    widget-attributes {
      display: inline-block;
      vertical-align: top;
      transition: all 0.2s;
    }

    .divider {
      display: inline-block;
      margin: 32px;
      width: 1px;
      background: #9e9e9e;
    }

    .product-error-message {
      color: red;
    }

    .is-merchandise-checkbox {
      margin-bottom: 16px !important;
    }

    .cancel-button {
      text-align: center;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.40);
    }

    .save-button {
      text-align: center;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.40);
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.2s ease', style({opacity: '1'})),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        animate('.2s ease', style({height: 0, opacity: 0}))
      ])
    ])
  ],
})
export class WidgetEditComponent {
  isRemovable = true

  /*@Input() widget: Widget*/
  widgetEditForm: FormGroup
  widgetName = new FormControl('', Validators.required)

  widgetErrorMessage = ''
  productErrorMessage = ''
  isMerchandise = new FormControl(false)
  sizes = new FormControl([], Validators.required)
  finishes = new FormControl([], Validators.required)
  types = new FormControl([], Validators.required)
  productName = new FormControl('')
  price = new FormControl('')
  quantity = new FormControl('')


  @ViewChild('widgetAttributesComponent') widgetAttributesComponent
  associatedWidgetAttributes = []
  selectedWidgetAttribute

  @ViewChild('widgetCategoriesComponent') widgetCategoriesComponent
  associatedWidgetCategoryOptions = []

  /** The root categories that aren't required to be filled out */
  widgetCategoriesLessAlreadyAdded = []
  private readonly rootTreeDepth = 0

  sizeWidgetCategory: WidgetCategory = null
  finishWidgetCategory: WidgetCategory = null
  typeWidgetCategory: WidgetCategory = null

  sizeOptionAdded = false
  finishOptionAdded = false
  typeOptionAdded = false

  selectedSizeOption: WidgetCategoryOption = null
  selectedFinishOption: WidgetCategoryOption = null
  selectedTypeOption: WidgetCategoryOption = null
  selectedOption: WidgetCategoryOption = null


  constructor(private widgetService: WidgetService, @Inject(FormBuilder) private formBuilder: FormBuilder, private router: Router) {
    this.widgetEditForm = this.formBuilder.group({
      "widgetName": this.widgetName,
      "isMerchandise": this.isMerchandise,
      "sizes": this.sizes,
      "finishes": this.finishes,
      "types": this.types,
      "productName": this.productName,
      "price": this.price,
      "quantity": this.quantity
    })
  }

  associateWidgetCategoryOptionWithWidget() {

  }

  associateWidgetAttributeWithWidget() {
    let index = this.associatedWidgetAttributes.findIndex(currWidgetAttribute => {
      return this.selectedWidgetAttribute._id === currWidgetAttribute._id
    })
    if (index == -1) {
      this.associatedWidgetAttributes.push(this.selectedWidgetAttribute)
      this.selectedWidgetAttribute = null
    } else {
      this.widgetErrorMessage = "Let's keep it to one of those."
      setTimeout(() => {
        this.widgetErrorMessage = ''
      }, 2500)
    }
  }

  dissociateWidgetAttributeWithWidget(widgetAttribute) {
    let index = this.associatedWidgetAttributes.findIndex(currWidgetAttribute => {
      return widgetAttribute._id === currWidgetAttribute._id
    })
    if (index != -1)
      this.associatedWidgetAttributes.splice(index, 1)
  }

  saveWidget() {

  }

  cancelEdit() {
    this.router.navigateByUrl('/widget/search')
  }


}
