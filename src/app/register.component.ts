import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WidgetsRUsUser, WidgetsRUsError} from './models'
import "rxjs/add/observable/of";
import {WidgetsRUsUserService} from "./widgets-r-us-users.service";
import "rxjs/add/operator/filter";

@Component({
  selector: 'wru-register',
  template: `
    <div *ngIf="userFlowErrorMessage" class="user-flow-error-message" [innerHTML]="userFlowErrorMessage"></div>
    <form [formGroup]="registerForm" (ngSubmit)="register()" class="register-form">
      <mat-form-field>
        <input matInput type="text" class="full-width" formControlName="username" placeholder="Username"/>
      </mat-form-field>
      <br/>
      <button type="submit" mat-raised-button style="text-align:center">Register</button>
    </form>
  `,
  styles: [`
    .user-flow-error-message {
      color: red;
    }

    .register-form {
      padding-top: 16px;
    }
  `]
})
export class RegisterComponent {

  userFlowErrorMessage = ''

  registerForm: FormGroup
  username = new FormControl("", Validators.required)

  constructor(private widgetsRUsUserService: WidgetsRUsUserService,
              @Inject(FormBuilder) private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({"username": this.username})

    // detect value changes on the query
    this.registerForm.valueChanges.subscribe(value => {
      this.userFlowErrorMessage = ''
    })
  }

  register() {
    this.widgetsRUsUserService.register(<WidgetsRUsUser>{username: this.username.value}).subscribe(response => {
      if (((<any>response).status < 200 || (<any>response).status >= 300) && (<any>response).error) {
        this.userFlowErrorMessage = (<any>response).error.message.message
      } else {

      }
    })
  }
}
