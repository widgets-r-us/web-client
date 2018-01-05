// See @widgets-r-us/model

export interface WidgetsRUsError {
  _id: string
  context: string
  code: string
  message: string
  data: string
  createdAt: Date
}
export interface Widget {
  _id: string
  name: string
}
export interface WidgetAttribute {
  _id: string
  widgetAttributeName: string
}
export interface WidgetXWidgetAttribute {
  _id: string
  widgetAttributeId: string
  widgetId: string
}
export interface WidgetCategory {
  _id: string
  parentId: string
  widgetCategoryName: string
}
export interface WidgetCategoryOption {
  _id: string
  parentId: string
  widgetCategoryOptionName: string
}
export interface WidgetXWidgetCategoryOption {
  _id: string
  widgetId: string
  widgetCategoryOptionId: string
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
  productName: string
  quantity: Number
  price: Number
}
export interface OrderXProduct {
  _id: string
  orderId: string
  productId: string
  quantityToBuy: Number
}
export interface ApiResponse {
  status: string
  message: any
}
