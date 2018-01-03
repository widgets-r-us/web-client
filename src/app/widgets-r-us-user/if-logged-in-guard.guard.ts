import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WidgetsRUsUserService } from './widgets-r-us-user.service';

@Injectable()
export class IfLoggedIn implements CanActivate {

  constructor(private wruUserService: WidgetsRUsUserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.wruUserService.authenticatedUser._id != '-1') {
      return true;
    } else {
      this.router.navigate(['/auth'], {
        queryParams: {
          initialRoute: state.url
        }
      });
      return false;
    }
  }
}

