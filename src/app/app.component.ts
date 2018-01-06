import {Component, ViewEncapsulation} from '@angular/core';
import {WidgetsRUsUserService} from "./widgets-r-us-user/widgets-r-us-user.service";

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <wru-header *ngIf="isLoggedIn()"></wru-header>
      <a class="heading" target="_blank" href="https://github.com/widgets-r-us/runner">
        <div>
          <div class="title-container {{titlePosition}}">{{title}}</div>
          <img class="logo {{logoWidth}}" alt="Widgets R Us logo" src="../assets/widgets-r-us-logo.svg">
        </div>
      </a>
      <div class="wru-body">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-container>
  `,
  styles: [`
    a.heading {
      color: white;
      background-color: white;
      text-decoration: none !important;
    }
    .logo {
      position: absolute;
      z-index: 2;
      transition: all 1s ease;
    }
    .logo.large {
      margin-top: 108px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
    }
    .logo.small {
      position: fixed;
      top: 5px;
      left: 8px;
      width: 54px;
    }
    .title-container {
      position: absolute;
      z-index: 2;
      text-shadow: 0 1px 2px rgba(0,0,0,0.20);
      transition: all 1s ease;
    }
    .title-container.front-center {
      margin-top: 64px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 36px;
    }
    .title-container.top-left {
      position: fixed;
      text-align: left;
      top: 18px;
      left: 78px;
      font-size: 24px;
    }
    .wru-body {
      margin-top: 64px;
    }
  `],
})
export class AppComponent {
  title = 'Welcome to Widgets-R-Us!';
  logoWidth = 'large'
  titlePosition = 'front-center'

  constructor(private widgetsRUsUserService: WidgetsRUsUserService) {
  }

  isLoggedIn() {
    if (this.widgetsRUsUserService.authenticatedUser._id == '-1') {
      this.logoWidth = 'large'
      this.titlePosition = 'front-center'
      this.title = 'Welcome to Widgets-R-Us!'
      return false
    } else {
      this.logoWidth = 'small'
      this.titlePosition = 'top-left'
      this.title = 'Widgets-R-Us'
      return true
    }

  }
}
