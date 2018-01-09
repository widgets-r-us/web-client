import {Component, Input} from "@angular/core";
import {WidgetService} from "./widget.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'associated-widget-category-option',
  template:`
    <div class="container">
      <mat-chip>{{widgetCategoryOption.displayString}}</mat-chip>
      <!--<mat-icon matChipRemove>cancel</mat-icon>-->
    </div>
  `,
  styles: [`
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
export class AssociatedWidgetCategoryOptionComponent {

  @Input() widgetCategoryOption
  @Input() rootWidgetCategories

  constructor(private widgetService: WidgetService) {
  }

}
