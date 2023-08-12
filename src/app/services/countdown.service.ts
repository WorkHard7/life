import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  showNegativeRemainingTime: string = '00:00';
  intervalId!: any;
  isTimerRunning: boolean = false;

  private isTimerRunningSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isTimerRunning$: Observable<boolean> = this.isTimerRunningSubject.asObservable();

  private redColorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColor$: Observable<boolean> = this.redColorSubject.asObservable(); //using asObservable method
  // we create a read only stream, of values that can be subscribed to, but not directly modified from outside the component.

  startCountdown(endTime: Date): void {
    const currentTime = new Date();
    const targetTime = new Date(endTime);
    // targetTime.setHours(20, 17, 0);
    this.isTimerRunning = true;

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingTime = (Math.floor(timeDiff / 1000));

    this.intervalId = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime === 0) {
        this.isTimerRunning = false;
        this.redColorSubject.next(true);

        document.body.style.backgroundColor = 'red';
      }

      this.showNegativeRemainingTime = this.formatNegativeNumber();
      console.log(this.showNegativeRemainingTime);
    }, 1000);
  }

  stopCountdown(): void {
    this.isTimerRunning = false;
    this.remainingTime = 0;
    this.showNegativeRemainingTime = '00:00';

    this.redColorSubject.next(false);

    this.resetBgColor();
    clearInterval(this.intervalId);
  }

  resetBgColor(): void {
    document.body.style.backgroundColor = '';
    this.redColorSubject.next(false);
  }

  formatNegativeNumber(): string {
    const sign = this.remainingTime < 0 ? '-' : '';
    const absRemainingTime = Math.abs(this.remainingTime);

    const hours = (Math.floor(absRemainingTime / 3600)).toString().padStart(2, '0');
    const seconds = (absRemainingTime % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(absRemainingTime / 60) % 60).toString().padStart(2, '0');

    return `${sign}${hours}:${minutes}:${seconds}`; // Store the formatted time
  }
}
