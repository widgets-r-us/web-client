import {AfterViewInit, Component} from "@angular/core";
import {WidgetService} from "./widget.service";
import {WidgetAttribute} from "../models";
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'widget-attributes',
  template: `
    <div class="header"><strong>Add/Remove Attributes</strong></div>
    <div *ngIf="errorMessage" class="error-message" [innerHTML]="errorMessage"></div>
    <widget-attribute *ngFor="let widgetAttribute of widgetAttributes"
                      [widgetAttribute]="widgetAttribute"
                      [@fadeIn] [@fadeOut]></widget-attribute>
    <new-widget-attribute></new-widget-attribute>
  `,
  styles: [`
    .header {
      font-size: 16px;
      margin-bottom: 16px;
    }
    widget-attribute {
      height: 230px;
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
export class WidgetAttributesComponent implements AfterViewInit {

  private widgetAttributes = <WidgetAttribute[]>[]
  errorMessage = ''

  constructor(private widgetService: WidgetService) {
    widgetService.widgetAttributesChanged.addHandler((event, val) => this.widgetAttributesChangedHandler(event, val))
  }

  ngAfterViewInit(): void {
    this.widgetService.getWidgetAttributes().subscribe(widgetAttributes => {
      if (widgetAttributes['context'] && widgetAttributes['code'] && widgetAttributes['message']) {
        // there was an error getting the widget attributes
      } else {
        console.log(widgetAttributes)
        this.widgetAttributes = <WidgetAttribute[]>widgetAttributes
      }
    })
  }

  widgetAttributesChangedHandler(event, value) {
    if (event === 'createWidgetAttribute') {
      this.widgetAttributes.push(value)
    } else if (event === 'deleteWidgetAttribute') {
      let index = this.widgetAttributes.findIndex(widgetAttribute => {
        return widgetAttribute._id === value
      })
      this.widgetAttributes.splice(index, 1)
    }
  }

}
