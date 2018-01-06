import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {WidgetsRUsUserService} from "./widgets-r-us-user/widgets-r-us-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'wru-header',
  template: `
    <div #header class="header">
      <button mat-raised-button color="primary" class="logout-button" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .header {
      background: #ff8308;
      position: fixed;
      top: 0;
      transition: all 2s;
      height: 0;
      width: 100%;
      z-index: 2;
    }
    .logout-button {
      float: right;
      top: 20%;
      right: 32px;
    }
    .logout-button:hover {
      box-shadow: 0px 2px 2px rgba(0,0,0,0.2);
      top: 19%;
      right: 33px;
    }
  `]
})
export class WruHeaderComponent implements AfterViewInit {

  @ViewChild('header') header

  ngAfterViewInit(): void {
    this.header.nativeElement.style.height = '64px'
  }

  constructor(private widgetsRUsUserService: WidgetsRUsUserService, private router: Router) {
  }

  logout() {
    this.widgetsRUsUserService.logout().subscribe(response => {
      if (((<any>response).status < 200 || (<any>response).status >= 300) && (<any>response).error) {
        // handle error with logout
      } else {
        this.router.navigateByUrl('/auth')
      }
    })
  }

}
