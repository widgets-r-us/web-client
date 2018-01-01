import {Inject, Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {WRU_API_URL_TOKEN} from "./injection-tokens"
import {Observable} from "rxjs/Observable"
import {catchError, map} from "rxjs/operators"
import {WidgetsRUsUser, WidgetsRUsError} from './models'

@Injectable()
export class WidgetsRUsUserService {

  currentlyLoggedInAccount: WidgetsRUsUser = <WidgetsRUsUser>{_id: '-1', username: ''}

  constructor(private http: HttpClient, @Inject(WRU_API_URL_TOKEN) private wruApiUrl: string) {
  }

  register(widgetsRUsUser: WidgetsRUsUser): Observable<WidgetsRUsUser | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/users/register`
    return this.http.post<WidgetsRUsError | WidgetsRUsUser>(url, widgetsRUsUser).pipe(
      map(response => {
        console.log(response)
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  login(widgetsRUsUser: WidgetsRUsUser): Observable<WidgetsRUsUser | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/users/login`
    return this.http.post<WidgetsRUsError | WidgetsRUsUser>(url, widgetsRUsUser).pipe(
      map(response => {
        console.log(response)
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  logout() {
    const url = `${this.wruApiUrl}/users/logout`
    return this.http.post<WidgetsRUsUser | WidgetsRUsError>(url, {}).pipe(
      map(response => {
        console.log(response)
        this.currentlyLoggedInAccount = <WidgetsRUsUser>{_id: '-1', username: ''}
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }
}
