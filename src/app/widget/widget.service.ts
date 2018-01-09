import {Inject, Injectable} from "@angular/core"
import {WRU_API_URL_TOKEN} from "../injection-tokens"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs/Observable"
import {catchError, map} from "rxjs/operators"
import {ApiResponse, Widget, WidgetAttribute, WidgetsRUsError} from "../models"
import {WruEvent} from "../../wru-event";

@Injectable()
export class WidgetService {

  readonly reservedRootWidgetCategoryName = 'reservedRootWidgetCategory'

  widgetAttributesChanged = new WruEvent<any>()
  widgetCategoriesChanged = new WruEvent<any>()
  widgetChanged = new WruEvent<any>()

  widgetCategories = {}

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
    return this.http.post<Widget | WidgetsRUsError>(url, {widgetCategoryName: widgetCategory}).pipe(
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
        this.widgetCategories = response.message.categoryTreeRoot
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

  deleteWidgetCategoryOption(widgetCategoryOptionId): Observable<Widget | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidgetCategoryOption`
    return this.http.request<Widget | WidgetsRUsError>('DELETE', url, {body: {widgetCategoryOptionId: widgetCategoryOptionId}}).pipe(
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

  createWidgetAttribute(widgetAttributeName): Observable<WidgetAttribute | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/createWidgetAttribute`
    return this.http.post<ApiResponse>(url, {widgetAttributeName: widgetAttributeName}).pipe(
      map(response => {
        console.log(response)
        this.widgetAttributesChanged.invoke('createWidgetAttribute', response.message)
        return response.message
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  getWidgetAttributes(): Observable<WidgetAttribute[] | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/getWidgetAttributes`
    return this.http.get<ApiResponse>(url).pipe(
      map(response => {
        console.log(response)
        return response.message
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }

  deleteWidgetAttribute(widgetAttributeId): Observable<WidgetAttribute | WidgetsRUsError> {
    const url = `${this.wruApiUrl}/widget/deleteWidgetAttribute`
    return this.http.request<Widget | WidgetsRUsError>('DELETE', url, {body: {widgetAttributeId: widgetAttributeId}}).pipe(
      map(response => {
        console.log(response)
        this.widgetAttributesChanged.invoke('deleteWidgetAttribute', widgetAttributeId)
        return response
      }),
      catchError(error => {
        console.log(error)
        return Observable.of(error)
      })
    )
  }
}
