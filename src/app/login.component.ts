import {Component, Inject} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import "rxjs/add/observable/of"
import {WidgetsRUsUserService} from "./widgets-r-us-users.service"
import {WidgetsRUsUser} from './models'

@Component({
  selector: 'wru-login',
  template: `
    <div *ngIf="userFlowErrorMessage" class="user-flow-error-message" [innerHTML]="userFlowErrorMessage"></div>
    <form [formGroup]="loginForm" (ngSubmit)="login()" class="login-form">
      <mat-form-field>
        <input matInput type="text" class="full-width" formControlName="username" placeholder="Username"/>
      </mat-form-field>
      <br/>
      <button type="submit" mat-raised-button style="text-align:center" (click)="login()">Login</button>
    </form>
  `,
  styles: [`    
    .user-flow-error-message {
      color: red;
    }
    .login-form {
      padding-top: 16px;
    }
  `]
})
export class LoginComponent {

  userFlowErrorMessage = ''

  loginForm: FormGroup
  username = new FormControl('', Validators.required)

  constructor(private widgetsRUsUserService: WidgetsRUsUserService,
              @Inject(FormBuilder) private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({"username": this.username})
  }

  login() {
    this.widgetsRUsUserService.login(<WidgetsRUsUser>{username: this.username.value}).subscribe(response => {
      if (((<any>response).status < 200 || (<any>response).status >= 300) && (<any>response).error) {
        this.userFlowErrorMessage = (<any>response).error.message.message
      } else {

      }
    })
  }
}
