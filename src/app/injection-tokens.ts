import {InjectionToken} from "@angular/core";

export const LOCAL_WRU_API_URL = 'http://localhost:3000/api'
export const REMOTE_WRU_API_URL = 'https://widgetsrus.alexanderjmedeiros.com/api'
export const WRU_API_URL_TOKEN = new InjectionToken<string>('WRU_API_URL_TOKEN')
