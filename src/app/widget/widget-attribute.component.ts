import {Component, Input} from "@angular/core";
import {WidgetService} from "./widget.service";
import {WidgetAttribute} from "../models";

@Component({
  selector: 'widget-attribute',
  template:`
    <div>{{widgetAttribute.widgetAttributeName}}
      <button mat-icon-button (click)="deleteWidgetAttribute()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
  `]
})
export class WidgetAttributeComponent {

  @Input() widgetAttribute: WidgetAttribute

  constructor(private widgetService: WidgetService) {
  }

  deleteWidgetAttribute() {
    this.widgetService.deleteWidgetAttribute(this.widgetAttribute._id).subscribe()
  }

}
