import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownAllocatedTimeService {
  remainingAllocatedTime: number = 0;
  showNegativeAllocatedRemainingTime: string = '00:00';
  allocatedIntervalId!: any;
  isAllocatedTimerRunning: boolean = false;

  private redColorAllocatedTimeTextSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColorAllocatedText$: Observable<boolean> = this.redColorAllocatedTimeTextSubject.asObservable();

  constructor() { }

  startCountdownForAllocatedTime (endAllocatedTime: Date) {
    const currentTime = new Date();
    const targetTime = new Date(endAllocatedTime);
    this.isAllocatedTimerRunning = true;

    if (this.allocatedIntervalId) window.clearTimeout(this.allocatedIntervalId);

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingAllocatedTime = (Math.floor(timeDiff / 1000));

    this.allocatedIntervalId = setInterval(() => {
      this.remainingAllocatedTime--;

      console.log('remainingAllocateTime', this.remainingAllocatedTime);

      if (this.remainingAllocatedTime <= 0) {
        this.isAllocatedTimerRunning = false;
        this.redColorAllocatedTimeTextSubject.next(true);
      }

      this.showNegativeAllocatedRemainingTime = this.formatNegativeNumberForAllocatedTime();
      console.log(this.showNegativeAllocatedRemainingTime);
    }, 1000);
  }

  stopCountdownForAllocatedTime(): void {
    this.isAllocatedTimerRunning = false;
    this.remainingAllocatedTime = 0;
    this.showNegativeAllocatedRemainingTime = '00:00';

    this.redColorAllocatedTimeTextSubject.next(false);

    clearInterval(this.allocatedIntervalId);
  }

  formatNegativeNumberForAllocatedTime(): string {
    const sign = this.remainingAllocatedTime < 0 ? '-' : '';
    const absRemainingAllocatedTime = Math.abs(this.remainingAllocatedTime);

    const hours = Math.floor(absRemainingAllocatedTime / 3600);
    const seconds = (absRemainingAllocatedTime % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(absRemainingAllocatedTime / 60) % 60);
    const totalMinutes = (hours * 60) + minutes;

    return `${sign}${totalMinutes}:${seconds}`; // Store the formatted time
  }
}
