import {Injectable} from '@angular/core';
import {SelectedSpeechService} from "./selected-speech.service";
import {CountdownAllocatedTimeService} from "./countdown-allocated-time.service";
import {AllEvents} from "../model/events";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {startTime, stopTime} from "../store/actions/isTimeRunning.actions";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  private intervalId!: any;
  private isCustomTime: boolean = false;
  showNegativeRemainingTime: { sign: string, minutes: string, seconds: string } =
    {
      sign: '',
      minutes: '00',
      seconds: '00'
    }

  watchtowerCustomEndTime: AllEvents = {
    index: 1,
    title: '',
    hours: 20,
    minutes: 10,
    seconds: 0,
    duration: 0
  };

  private readonly watchtowerLastPart: AllEvents = {
    index: 2,
    title: 'Turnul de veghe',
    hours: 20,
    minutes: 15,
    seconds: 0,
    duration: 4
  }

  private readonly lifeAndMinistryLastPart = {
    title: 'Cântare, rugăciune de încheiere',
    hours: 20,
    minutes: 45,
    seconds: 0
  }

  constructor(
    private store: Store<AppState>,
    private selectedSpeechService: SelectedSpeechService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService
  ) {
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
    this.store.dispatch(startTime());

    if (this.intervalId) window.clearTimeout(this.intervalId);

    const timeDiff = targetTime.getTime() - currentTime.getTime();
    this.remainingTime = (Math.floor(timeDiff / 1000));

    this.intervalId = setInterval(() => {
      console.log('remainingTime in second', this.remainingTime);

      this.showNegativeRemainingTime = this.formatNegativeNumber();
      this.checkFinalBlockLM();

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

  private checkFinalBlockLM() {
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
      endTime.setHours(
        this.watchtowerLastPart.hours,
        this.watchtowerLastPart.minutes,
        this.watchtowerLastPart.seconds
      );
    }

    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endTime);
  }
}
