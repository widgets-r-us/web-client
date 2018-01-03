import {Inject, Injectable} from "@angular/core"
import {WRU_API_URL_TOKEN} from "../injection-tokens"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs/Observable"
import {catchError, map} from "rxjs/operators"
import {Widget, WidgetsRUsError} from "../models"

@Injectable()
export class WidgetService {

  constructor(private http: HttpClient, @Inject(WRU_API_URL_TOKEN) private wruApiUrl: string) {
  }

  createWidget(widget, isMerchandise, product, attributes, categoryOptions): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/createWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {
      widget: widget, isMerchandise: isMerchandise, product: product,
      attributes: attributes, categoryOptions: categoryOptions
    }).pipe(
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

  getWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/getWidget?widgetId=${widgetId}`
    return this.http.get<Widget | WidgetsRUsError>(url).pipe(
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

  deleteWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  associateWidgetAttributeWithWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/associateWidgetAttributeWithWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  dissociateWidgetAttributeWithWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/dissociateWidgetAttributeWithWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  associateWidgetCategoryOptionWithWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/associateWidgetCategoryOptionWithWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  dissociateWidgetCategoryOptionWithWidget(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/dissociateWidgetCategoryOptionWithWidget`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  createWidgetCategory(widgetCategory): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/createWidgetCategory`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetCategory: widgetCategory}).pipe(
      map(response => {
        console.log(response)
        return (<any>response).message
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  getWidgetCategoriesAndOptions(): Observable<any | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/getWidgetCategoriesAndOptions`
    return this.http.get<any | WidgetsRUsError>(url).pipe(
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

  deleteWidgetCategory(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidgetCategory`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  createWidgetCategoryOption(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/createWidgetCategoryOption`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  deleteWidgetCategoryOption(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidgetCategoryOption`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  createWidgetAttribute(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/createWidgetAttribute`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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

  deleteWidgetAttribute(widgetId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidgetAttribute`
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetId: widgetId}).pipe(
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
}
