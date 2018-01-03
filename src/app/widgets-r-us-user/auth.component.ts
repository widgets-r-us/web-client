import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {WidgetsRUsUserService} from "./widgets-r-us-user.service";

@Component({
  selector: 'auth',
  template: `
    <mat-tab-group class="auth-panel" dynamicHeight="true">
      <mat-tab label="Login">
        <wru-login></wru-login>
      </mat-tab>
      <mat-tab label="Register">
        <wru-register></wru-register>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .auth-panel {
      margin-top: 256px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  `]
})
export class AuthComponent {

  initialRoute = ''

  constructor(private router: Router, private route: ActivatedRoute, private widgetsRUsUserService: WidgetsRUsUserService) {
    this.widgetsRUsUserService.addAuthChangeHandler((oldVal, currentlyLoggedInUser) => {
      if (currentlyLoggedInUser._id != '-1')
        this.router.navigateByUrl(this.initialRoute)
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.initialRoute = params['initialRoute'] || '/widget/search')
  }

}
