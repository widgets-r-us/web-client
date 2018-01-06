import {Component, Input, Output} from "@angular/core";
import {WidgetService} from "./widget.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'add-widget-category-option-to-widget',
  template:`
    <div class="container" [@fadeIn]>
      <span *ngFor="let depth of Array(treeDepth).fill(0)" class="indent"></span>
      <mat-select placeholder="{{placeholder}}" [(value)]="selectedChild">
        <mat-option *ngFor="let child of widgetCategory.children" [value]="child">
          <span *ngIf="child.widgetCategoryName" class="category">{{child.widgetCategoryName}}</span>
          <span *ngIf="child.widgetCategoryOptionName" class="option">{{child.widgetCategoryOptionName}}</span>
        </mat-option>
      </mat-select>
      <span *ngIf="selectedChild">
        <add-widget-category-option-to-widget *ngIf="selectedChild.widgetCategoryName" [treeDepth]="treeDepth+1" [widgetCategory]="selectedChild"></add-widget-category-option-to-widget>
      </span>
    </div>
  `,
  styles: [`
    .indent {
      margin-left: 4px;
    }
    .category {
      font-size: 14px;
    }
    .option {
      font-size: 12px;
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

  @Input() placeholder
  @Input() treeDepth
  @Input() widgetCategory
  @Output() selectedChild

  constructor(private widgetService: WidgetService) {
  }

}
