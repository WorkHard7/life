import {Signal} from "@angular/core";

export interface AllEvents {
  index: number | Signal<any>,
  title: string,
  hours: any,
  minutes: any,
  seconds: any,
  duration: number
}
