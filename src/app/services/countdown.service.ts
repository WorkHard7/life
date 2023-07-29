import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  intervalId!: any;
  isTimerRunning: boolean = false;

  private isTimerRunningSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isTimerRunning$: Observable<boolean> = this.isTimerRunningSubject.asObservable();

  private redColorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColor$: Observable<boolean> = this.redColorSubject.asObservable(); //using asObservable method
  // we create a read only stream, of values that can be subscribed to, but not directly modified from outside the component.

  constructor() {
  }

  startCountdown(startTime: Date): void {
    const currentTime = new Date();
    const targetTime = new Date(startTime);
    // targetTime.setHours(20, 17, 0);
    this.isTimerRunning = true;

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingTime = Math.max(Math.floor(timeDiff / 1000), 0);

    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.isTimerRunning = false;
        this.redColorSubject.next(true);

        document.body.style.backgroundColor = 'red';

        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  stopCountdown(): void {
    this.isTimerRunning = false;
    this.remainingTime = 0;

    this.redColorSubject.next(false);

    clearInterval(this.intervalId);
  }

  resetBgColor(): void {
    document.body.style.backgroundColor = '';
    this.redColorSubject.next(false);
  }
}
