import {Component, Inject} from "@angular/core";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'widget-edit',
  template:`
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
    <div class="widget-edit-container">
      
      <form [formGroup]="widgetEditForm" (ngSubmit)="saveWidget()" class="widget-edit-form">
        <div class="header"><strong>Add/Edit Widget</strong></div>
        <mat-form-field>
          <input matInput type="text" class="full-width" formControlName="widgetName" placeholder="Widget name"/>
        </mat-form-field>
        <br/>
        <mat-form-field><mat-select [formControl]="sizes" placeholder="Size"></mat-select></mat-form-field>
        <mat-form-field><mat-select [formControl]="finishes" placeholder="Finish"></mat-select></mat-form-field>
        <mat-form-field><mat-select [formControl]="types" placeholder="Type"></mat-select></mat-form-field>
        <mat-checkbox class="is-merchandise-checkbox" color="primary" [formControl]="isMerchandise">Is merchandise (will be listed on the store)</mat-checkbox>
        <div style="margin: 8px 0;"></div>
        <div *ngIf="isMerchandise.value">
          <div class="product-error-message">{{productErrorMessage}}</div>
          <mat-form-field>
            <input matInput type="text" class="full-width" formControlName="productName" placeholder="Product name (what to list this item as in the store)"/>
          </mat-form-field>
          <br/>
          <mat-form-field>
            <span matPrefix>$ &nbsp;</span>
            <input matInput type="text" class="full-width" formControlName="price" placeholder="Price"/>
          </mat-form-field>
          <br/>
          <mat-form-field>
            <span matPrefix></span>
            <input matInput type="text" class="full-width" formControlName="quantity" placeholder="Quantity (how many are in stock)"/>
          </mat-form-field>
        </div>
        <br/>
        <button class="cancel-button" mat-raised-button color="warn" (click)="cancelEdit()">Cancel</button>
        <button class="save-button" type="submit" mat-raised-button color="primary">Save</button>
      </form>
      
      <span class="divider"></span>
      
      <widget-categories></widget-categories>
      
      <span class="divider"></span>
      
      <widget-attributes></widget-attributes>
    </div>
  `,
  styles: [`
    .header {
      font-size: 16px;
      margin-bottom: 16px;
    }
    .widget-edit-container {
      margin-top: 128px;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
    .widget-edit-form {
      display: inline-block;
      vertical-align: top;
    }
    widget-categories {
      display: inline-block;
      vertical-align: top;
    }
    widget-attributes {
      display: inline-block;
      vertical-align: top;
    }
    .divider {
      margin: 32px;
    }
    .product-error-message {
      color: red;
    }
    .is-merchandise-checkbox {
      margin-bottom: 16px !important;
    }
    .cancel-button {
      text-align: center;
      text-shadow: 0 1px 2px rgba(0,0,0,0.40);
    }
    .save-button {
      text-align: center;
      text-shadow: 0 1px 2px rgba(0,0,0,0.40);
    }
  `]
})
export class WidgetEditComponent {

  /*@Input() widget: Widget*/
  widgetEditForm: FormGroup
  widgetName = new FormControl('', Validators.required)

  productErrorMessage = ''
  isMerchandise = new FormControl(false)
  sizes = new FormControl([])
  finishes = new FormControl([])
  types = new FormControl([])
  productName = new FormControl('')
  price = new FormControl('')
  quantity = new FormControl('')


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

  saveWidget() {
  }

  cancelEdit() {
    this.router.navigateByUrl('/widget/search')
  }



}
