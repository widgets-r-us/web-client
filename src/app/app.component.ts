import {Component} from '@angular/core';
import {WidgetsRUsUserService} from "./widgets-r-us-users.service";

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <div class="full-width" style="text-align: center">
        <h1>Welcome to {{title}}!</h1>
        <img class="logo {{logoWidth}}" alt="Widgets R Us logo" src="../assets/widgets-r-us-logo.svg">
      </div>
      <mat-tab-group *ngIf="!isLoggedIn()" class="full-width" dynamicHeight="true">
        <mat-tab label="Login">
          <wru-login></wru-login>
        </mat-tab>
        <mat-tab label="Register">
          <wru-register></wru-register>
        </mat-tab>
      </mat-tab-group>
      <widget-edit *ngIf="isLoggedIn()">
      </widget-edit>
    </mat-sidenav-container>
  `,
  styles: [`
    img.logo {
      margin-bottom: 32px;
      transition: width 0.5s, height 0.5s;
    }
    img.logo.large {
      width: 200px;
    }
    img.logo.small {
      width: 64px;
    }
    
    .full-width {
      margin: 0 auto;
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }
  `]
})
export class AppComponent {
  title = 'Widgets-R-Us';
  logoWidth = 'large'

  constructor(private widgetsRUsUserService: WidgetsRUsUserService) {
  }

  isLoggedIn() {
    if (this.widgetsRUsUserService.currentlyLoggedInAccount._id == '-1') {
      this.logoWidth = 'large'
      return false
    } else {
      this.logoWidth = 'small'
      return true
    }

  }
}
