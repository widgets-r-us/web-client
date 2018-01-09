import {Component, EventEmitter, Input, Output} from "@angular/core";
import {WidgetService} from "./widget.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {WidgetCategory, WidgetCategoryOption} from "../models";

@Component({
  selector: 'add-widget-category-option-to-widget',
  template:`
    <div class="container" [@fadeIn]="''">
      <span *ngFor="let depth of numIndents" class="indent"></span>
      <mat-form-field>
        <mat-select placeholder="{{placeHolder}}" [(value)]="selectedChild">
          <mat-option *ngFor="let child of widgetCategory.children" [value]="child">
            <span *ngIf="child.widgetCategoryName" class="category">{{child.widgetCategoryName}}</span>
            <span *ngIf="child.widgetCategoryOptionName" class="option">{{child.widgetCategoryOptionName}}</span>
          </mat-option>
        </mat-select>
      </mat-form-field>
      <span *ngIf="selectedChild">
        <add-widget-category-option-to-widget *ngIf="selectedChild.widgetCategoryName"
                                              [placeHolder]="selectedChild.widgetCategoryName"
                                              [treeDepth]="treeDepth+1"
                                              [widgetCategory]="selectedChild"
                                              (categoryOptionSelected)="onCategoryOptionSelected($event)">
        </add-widget-category-option-to-widget>
        <button *ngIf="selectedChild.widgetCategoryOptionName" mat-icon-button
                (click)="onCategoryOptionSelected(selectedChild)">
          <mat-icon>add</mat-icon>
        </button>
      </span>
    </div>
  `,
  styles: [`
    .indent {
      margin-left: 24px;
    }
    .category {
      font-size: 16px;
    }
    .option {
      font-size: 14px;
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
        animate('.2s ease', style({ height: 0, opacity: 0 }))
      ])
    ])
  ],
})
export class AddWidgetCategoryToWidgetComponent {

  @Input() placeHolder: string
  @Input() treeDepth: number
  @Input() widgetCategory: WidgetCategory

  selectedChild = <WidgetCategory | WidgetCategoryOption>{}

  @Output() categoryOptionSelected = new EventEmitter<WidgetCategoryOption>()

  get numIndents() { return Array(this.treeDepth).fill(0) }

  constructor(private widgetService: WidgetService) {
  }

  private categoryNotRoot() {
    return this.widgetCategory.widgetCategoryName != this.widgetService.reservedRootWidgetCategoryName
  }

  onCategoryOptionSelected(categoryOption: WidgetCategoryOption) {
    if (!categoryOption.displayString)
      categoryOption.displayString = categoryOption.widgetCategoryOptionName
    if (this.categoryNotRoot())
      categoryOption.displayString = this.widgetCategory.widgetCategoryName + " > " + categoryOption.displayString

    let currentRoot = categoryOption
    while (currentRoot.parent)
      currentRoot = currentRoot.parent
    if (this.categoryNotRoot())
      currentRoot.parent = this.widgetCategory

    this.categoryOptionSelected.emit(categoryOption)
  }

}
