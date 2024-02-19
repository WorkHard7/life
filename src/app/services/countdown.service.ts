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

  private watchtowerCustomEndTime: Object = {
    hours: 11,
    minutes: 38,
    seconds: 0
  };

  private redColorTextSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColorText$: Observable<boolean> = this.redColorTextSubject.asObservable(); //using asObservable method
  // we create a read only stream, of values that can be subscribed to, but not directly modified from outside the component.

  constructor() {
    this.watchtowerCustomEndTime = localStorage.getItem('watchtowerCustomEndTime') ?
      JSON.parse(localStorage.getItem('watchtowerCustomEndTime')!) :
      localStorage.setItem('watchtowerCustomEndTime', JSON.stringify(this.watchtowerCustomEndTime));
  }

  startCountdown(endTime: Date): void {
    const currentTime = new Date();
    const targetTime = new Date(endTime);
    this.isTimerRunning = true;

    if (this.intervalId) window.clearTimeout(this.intervalId);

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingTime = (Math.floor(timeDiff / 1000));

    this.intervalId = setInterval(() => {
      this.remainingTime--;

      console.log('remainingTime', this.remainingTime);

      if (this.remainingTime <= 0) {
        this.isTimerRunning = false;
        this.redColorTextSubject.next(true);
      }

      this.showNegativeRemainingTime = this.formatNegativeNumber();
      console.log(this.showNegativeRemainingTime);
    }, 1000);
  }

  stopCountdown(): void {
    this.isTimerRunning = false;
    this.remainingTime = 0;
    this.showNegativeRemainingTime = '00:00';

    this.redColorTextSubject.next(false);

    clearInterval(this.intervalId);
  }

  setWatchtowerCustomEndTime(watchtowerEndTime: any) {
    localStorage.setItem('watchtowerCustomEndTime', JSON.stringify(watchtowerEndTime));
    this.watchtowerCustomEndTime = watchtowerEndTime;
  }

  getCustomEndTime() {
    return this.watchtowerCustomEndTime;
  }

  formatNegativeNumber(): string {
    const sign = this.remainingTime < 0 ? '-' : '';
    const absRemainingTime = Math.abs(this.remainingTime);

    const hours = Math.floor(absRemainingTime / 3600);
    const seconds = (absRemainingTime % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(absRemainingTime / 60) % 60);
    const totalMinutes = (hours * 60) + minutes;

    return `${sign}${totalMinutes}:${seconds}`; // Store the formatted time
  }
}
