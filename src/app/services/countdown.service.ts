import {Injectable} from '@angular/core';
import {SelectedSpeechService} from "./selected-speech.service";
import {CountdownAllocatedTimeService} from "./countdown-allocated-time.service";
import {AllEvents} from "../model/events";

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  remainingTime: number = 0;
  intervalId!: any;
  isTimerRunning: boolean = false;
  isCustomTime: boolean = false;
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

  private watchtowerLastPart: AllEvents = {
    index: 2,
    title: 'Turnul de veghe',
    hours: 20,
    minutes: 15,
    seconds: 0,
    duration: 4
  }

  private LifeAndMinistryLastPart = {
    title: 'Cântare, rugăciune de încheiere',
    hours: 20,
    minutes: 45,
    seconds: 0
  }

  constructor(
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
    this.isTimerRunning = true;

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
    this.isTimerRunning = false;
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

  private checkFinalBlockLM() {
    this.selectedSpeechService.selectedSpeech$.subscribe((selectedSpeech) => {
      if (selectedSpeech.title === 'Cuvinte de încheiere, anunțuri' || selectedSpeech.title === 'Turnul de veghe') {
        if (this.showNegativeRemainingTime.sign === '-' && this.showNegativeRemainingTime.minutes >= '01') {
          this.stopCountdown();
          this.setEndTime(selectedSpeech);
        }
      }
    })
  }

  private setEndTime(selectedSpeech: AllEvents) {
    const endTime = new Date();

    if (selectedSpeech.title === 'Cuvinte de încheiere, anunțuri') {
      endTime.setHours(
        this.LifeAndMinistryLastPart.hours,
        this.LifeAndMinistryLastPart.minutes,
        this.LifeAndMinistryLastPart.seconds
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
