import {Inject, Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {WRU_API_URL_TOKEN} from "../injection-tokens"
import {Observable} from "rxjs/Observable"
import {catchError, map} from "rxjs/operators"
import {WidgetsRUsUser, WidgetsRUsError} from '../models'

@Injectable()
export class WidgetsRUsUserService {

  private _authenticatedUser: WidgetsRUsUser = <WidgetsRUsUser>{_id: '-1', username: ''}
  get authenticatedUser() {return this.getAuthenticatedUser()}
  private authChangeHandlers = []

  constructor(private http: HttpClient, @Inject(WRU_API_URL_TOKEN) private wruApiUrl: string) {
  }

  register(widgetsRUsUser: WidgetsRUsUser): Observable<WidgetsRUsUser | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/user/register`
    return this.http.post<WidgetsRUsError | WidgetsRUsUser>(url, widgetsRUsUser).pipe(
      map(response => {
        console.log(response)
        this.setAuthenticatedUser((<any>response).message)
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  login(widgetsRUsUser: WidgetsRUsUser): Observable<WidgetsRUsUser | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/user/login`
    return this.http.post<WidgetsRUsError | WidgetsRUsUser>(url, widgetsRUsUser).pipe(
      map(response => {
        console.log(response)
        this.setAuthenticatedUser((<any>response).message)
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  logout() {
    const url = `${this.wruApiUrl}/user/logout`
    return this.http.post<WidgetsRUsUser | WidgetsRUsError>(url, {}).pipe(
      map(response => {
        console.log(response)
        this.setAuthenticatedUser(<WidgetsRUsUser>{_id: '-1', username: ''})
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  setAuthenticatedUser(user: WidgetsRUsUser) {
    for (const authChangeHandler of this.authChangeHandlers)
      authChangeHandler(this.authenticatedUser, user)
    this._authenticatedUser = user
    localStorage.setItem("authenticatedUser", JSON.stringify(this._authenticatedUser))
  }

  getAuthenticatedUser() {
    if (this._authenticatedUser._id == '-1') {
      let user = JSON.parse(localStorage.getItem("authenticatedUser"))
      if (user && user._id != '-1')
        return user
      else
        return <WidgetsRUsUser>{_id: '-1', username: ''}
    } else {
      return this._authenticatedUser
    }
  }

  addAuthChangeHandler(handler: (oldVal, newVal) => void) {
    this.authChangeHandlers.push(handler)
  }

  removeAuthChangeHandler(handler: (oldVal, newVal) => void) {
    let index = this.authChangeHandlers.indexOf(handler)
    if (index != -1)
      this.authChangeHandlers.splice(index, 1)
  }
}
