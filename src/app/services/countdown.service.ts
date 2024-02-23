import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  showNegativeRemainingTime: { sign: string, minutes: string, seconds: string } =
    {
      sign: '',
      minutes: '00',
      seconds: '00'
    }
  intervalId!: any;
  isTimerRunning: boolean = false;
  isCustomTime: boolean = false;

  private watchtowerCustomEndTime: Object = {
    hours: '11',
    minutes: '40',
    seconds: 0
  };

  private redColorTextSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColorText$: Observable<boolean> = this.redColorTextSubject.asObservable(); //using asObservable method
  // we create a read only stream, of values that can be subscribed to, but not directly modified from outside the component.

  constructor() {
    this.initializeCustomEndTime();
    this.initializeCustomTimeStatus();
  }

  private initializeCustomEndTime() {
    const storedWatchtowerEndTime = localStorage.getItem('watchtowerCustomEndTime');

    if (storedWatchtowerEndTime) {
      this.watchtowerCustomEndTime = JSON.parse(storedWatchtowerEndTime);
    } else {
      localStorage.setItem('watchtowerCustomEndTime', JSON.stringify(this.watchtowerCustomEndTime));
    }
  }

  private initializeCustomTimeStatus() {
    const customTimeStatus = localStorage.getItem('isCustomTime');

    if (customTimeStatus) {
      this.isCustomTime = JSON.parse(customTimeStatus);
    } else {
      localStorage.setItem('isCustomTime', JSON.stringify(this.isCustomTime));
    }
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

      console.log('remainingTime in second', this.remainingTime);

      if (this.remainingTime <= 0) {
        this.redColorTextSubject.next(true);
      }

      this.showNegativeRemainingTime = this.formatNegativeNumber();
      console.log('remaining time Object', this.showNegativeRemainingTime);
    }, 1000);
  }

  stopCountdown(): void {
    this.isTimerRunning = false;
    this.remainingTime = 0;
    this.showNegativeRemainingTime =
      {
        sign: '',
        minutes: '00',
        seconds: '00'
      }

    this.redColorTextSubject.next(false);

    clearInterval(this.intervalId);
  }

  setWatchtowerCustomTimeToLocalStorage(watchtowerEndTime: any) {
    localStorage.setItem('watchtowerCustomEndTime', JSON.stringify(watchtowerEndTime));
    this.watchtowerCustomEndTime = watchtowerEndTime;
  }

  setAsCustomTimeToLocalStorage(isCustomTime: any) {
    localStorage.setItem('isCustomTime', JSON.stringify(isCustomTime));
    this.isCustomTime = isCustomTime;
  }

  getWatchtowerCustomEndTime() {
    return this.watchtowerCustomEndTime;
  }

  getCustomTimeStatus() {
    return this.isCustomTime;
  }

  formatNegativeNumber(): any {
    const sign = this.remainingTime < 0 ? '-' : '';
    const absRemainingTime = Math.abs(this.remainingTime);

    const hours = Math.floor(absRemainingTime / 3600);
    const seconds = (absRemainingTime % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(absRemainingTime / 60) % 60);
    const totalMinutes = (hours * 60) + minutes;

    return {
      sign: sign,
      minutes: totalMinutes.toString().padStart(2, '0'),
      seconds: seconds
    };
  }
}
