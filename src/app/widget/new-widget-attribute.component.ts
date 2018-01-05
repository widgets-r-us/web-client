import {Component, Inject, OnInit} from "@angular/core";
import {WidgetService} from "./widget.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WidgetAttribute, WidgetsRUsError} from "../models";

@Component({
  selector: 'new-widget-attribute',
  template:`
    <form [formGroup]="widgetAttributeForm" (ngSubmit)="createWidgetAttribute()">
      <mat-form-field>
        <input matInput [formControl]="widgetAttributeName" placeholder="Attribute name"/>
        <mat-error *ngIf="widgetAttributeName.hasError('validation')">{{widgetAttributeName.getError('validation')}}</mat-error>
      </mat-form-field>
      <button mat-icon-button><mat-icon>add</mat-icon></button>
    </form>
  `,
  styles: [`
  `]
})
export class NewWidgetAttributeComponent {

  widgetAttributeForm: FormGroup
  widgetAttributeName = new FormControl('')

  constructor(private widgetService: WidgetService, @Inject(FormBuilder) private formBuilder: FormBuilder) {
    this.widgetAttributeForm = this.formBuilder.group({
      "widgetAttributeName": this.widgetAttributeName
    })
  }

  createWidgetAttribute() {
    this.widgetService.createWidgetAttribute(this.widgetAttributeName.value).subscribe(widgetAttribute => {
      if ((<WidgetAttribute>widgetAttribute).widgetAttributeName) {
        this.widgetAttributeName.reset()
      } else {
        let error = (<any>widgetAttribute).error.message
        let reason = error.message
        if (reason.match('Failed validation'))
          this.widgetAttributeName.setErrors({'validation': reason})
      }
    })
  }

}
