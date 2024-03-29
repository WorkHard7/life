import {Injectable} from '@angular/core';
import {SelectedSpeechService} from "./selected-speech.service";
import {CountdownAllocatedTimeService} from "./countdown-allocated-time.service";
import {AllEvents} from "../model/events";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {startTime, stopTime} from "../store/actions/isTimeRunning.actions";
import {WatchtowerService} from "./watchtower.service";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  private intervalId!: any;
  showNegativeRemainingTime: { sign: string, minutes: string, seconds: string } =
    {
      sign: '',
      minutes: '00',
      seconds: '00'
    }

  private readonly lifeAndMinistryLastPart =
    {
      title: 'Cântare, rugăciune de încheiere',
      hours: 20,
      minutes: 45,
      seconds: 0
    }

  constructor(
    private store: Store<AppState>,
    private selectedSpeechService: SelectedSpeechService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private watchtowerService: WatchtowerService
  ) {
  }

  startCountdown(endTime: Date): void {
    const currentTime = new Date();
    const targetTime = new Date(endTime);
    this.store.dispatch(startTime());

    if (this.intervalId) window.clearTimeout(this.intervalId);

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingTime = (Math.floor(timeDiff / 1000));

    this.intervalId = setInterval(() => {
      console.log('remainingTime in second', this.remainingTime);

      this.showNegativeRemainingTime = this.formatNegativeNumber();
      this.checkFinalBlockLifeAndW();

      console.log('remaining time Object', this.showNegativeRemainingTime);
      this.remainingTime--;
    }, 1000);
  }

  stopCountdown(): void {
    this.store.dispatch(stopTime());
    this.remainingTime = 0;
    this.showNegativeRemainingTime =
      {
        sign: '',
        minutes: '00',
        seconds: '00'
      }
    clearInterval(this.intervalId);
  }

  private formatNegativeNumber(): any {
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

  private checkFinalBlockLifeAndW() {
    const selectedSpeechTitle = this.selectedSpeechService.selectedSpeechSig().title;

    if (selectedSpeechTitle === 'Cuvinte de încheiere, anunțuri' ||
      selectedSpeechTitle === 'Turnul de veghe') {
      if (this.showNegativeRemainingTime.sign === '-' && this.showNegativeRemainingTime.minutes >= '01') {
        this.stopCountdown();
        this.setEndTime(this.selectedSpeechService.selectedSpeechSig());
      }
    }
  }

  private setEndTime(selectedSpeech: AllEvents) {
    const endTime = new Date();

    if (selectedSpeech.title === 'Cuvinte de încheiere, anunțuri') {
      endTime.setHours(
        this.lifeAndMinistryLastPart.hours,
        this.lifeAndMinistryLastPart.minutes,
        this.lifeAndMinistryLastPart.seconds
      );
    } else {
      this.watchtowerService.setTimeWatchtowerLastPart(endTime);
    }

    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endTime);
  }
}
