// See @widgets-r-us/model

export interface WidgetsRUsError {
  _id: string
  context: string
  code: string
  message: string
  data: string
  createdAt: Date
}
export interface WidgetType {
  _id: string
  widgetType: string
}
export interface WidgetFinish {
  _id: string
  widgetFinish: string
}
export interface WidgetSize {
  _id: string
  widgetSize: string
}
export interface Widget {
  _id: string
  name: string
  widgetTypeId: string
  widgetFinishId: string
  widgetSizeId: string
}
export interface CustomWidgetAttribute {
  _id: string
  customWidgetAttribute: string
}
export interface CustomWidgetAttributeWidget {
  _id: string
  customWidgetAttributeId: string
  widgetId: string
}
export interface CustomWidgetCategory {
  _id: string
  customWidgetCategory: string
}
export interface CustomWidgetCategoryOption {
  _id: string
  customWidgetCategoryId: string
  customWidgetCategoryOption: string
}
export interface CustomWidgetCategoryOptionWidget {
  _id: string
  customWidgetCategoryOptionId: string
  widgetId: string
}
export interface WidgetsRUsUser {
  _id: string
  username: string
}
export interface Order {
  _id: string
  widgetsRUsUserId: string
}
export interface Product {
  _id: string
  merchandiseId: string
  name: string
  quantity: Number
  price: Number
}
export interface OrderProduct {
  _id: string
  orderId: string
  productId: string
  quantityToBuy: Number
}
