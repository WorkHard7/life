import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountdownAllocatedTimeService {
  remainingAllocatedTime: number = 0;
  showNegativeAllocatedRemainingTime: { sign: string, minutes: string, seconds: string } =
    {
      sign: '',
      minutes: '00',
      seconds: '00'
    }
  allocatedIntervalId!: any;
  isAllocatedTimerRunning: boolean = false;

  private redColorAllocatedTimeTextSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public redColorAllocatedText$: Observable<boolean> = this.redColorAllocatedTimeTextSubject.asObservable();

  startCountdownForAllocatedTime(endAllocatedTime: Date) {
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
        this.redColorAllocatedTimeTextSubject.next(true);
      }

      this.showNegativeAllocatedRemainingTime = this.formatNegativeNumberForAllocatedTime();
      console.log('remainingAllocatedTime Object', this.showNegativeAllocatedRemainingTime);
    }, 1000);
  }

  stopCountdownForAllocatedTime(): void {
    this.isAllocatedTimerRunning = false;
    this.remainingAllocatedTime = 0;
    this.showNegativeAllocatedRemainingTime =
      {
        sign: '',
        minutes: '00',
        seconds: '00'
      }

    this.redColorAllocatedTimeTextSubject.next(false);

    clearInterval(this.allocatedIntervalId);
  }

  formatNegativeNumberForAllocatedTime(): any {
    const sign = this.remainingAllocatedTime < 0 ? '-' : '';
    const absRemainingAllocatedTime = Math.abs(this.remainingAllocatedTime);

    const hours = Math.floor(absRemainingAllocatedTime / 3600);
    const seconds = (absRemainingAllocatedTime % 60).toString().padStart(2, '0');
    const minutes = (Math.floor(absRemainingAllocatedTime / 60) % 60);
    const totalMinutes = (hours * 60) + minutes;

    return {
      sign: sign,
      minutes: totalMinutes.toString().padStart(2, '0'),
      seconds: seconds
    };
  }
}
