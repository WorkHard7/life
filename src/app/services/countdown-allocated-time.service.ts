import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {startAllocatedTime, stopAllocatedTime} from "../store/actions/isAllocatedTimeRunning.actions";

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
  private allocatedIntervalId!: any;

  constructor(private store: Store<AppState>) {
  }

  startCountdownForAllocatedTime(endAllocatedTime: Date) {
    const currentTime = new Date();
    const targetTime = new Date(endAllocatedTime);
    this.store.dispatch(startAllocatedTime());

    if (this.allocatedIntervalId) window.clearTimeout(this.allocatedIntervalId);

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingAllocatedTime = (Math.floor(timeDiff / 1000));

    this.allocatedIntervalId = setInterval(() => {

      console.log('remainingAllocateTime', this.remainingAllocatedTime);

      this.showNegativeAllocatedRemainingTime = this.formatNegativeNumberForAllocatedTime();
      console.log('remainingAllocatedTime Object', this.showNegativeAllocatedRemainingTime);

      this.remainingAllocatedTime--;
    }, 1000);
  }

  stopCountdownForAllocatedTime(): void {
    this.store.dispatch(stopAllocatedTime());
    this.remainingAllocatedTime = 0;
    this.showNegativeAllocatedRemainingTime =
      {
        sign: '',
        minutes: '00',
        seconds: '00'
      }

    clearInterval(this.allocatedIntervalId);
  }

  private formatNegativeNumberForAllocatedTime(): any {
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
