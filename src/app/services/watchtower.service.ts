import {Injectable} from '@angular/core';
import {AllEvents} from "../model/events";

@Injectable({
  providedIn: 'root'
})
export class WatchtowerService {
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
  private isCustomTime: boolean = false;
  private selectedParagraph: number = 20;

  constructor() {
    this.initializeSelectedParagraph();
    this.initializeWatchtowerCustomEndTime();
    this.initializeCustomTimeStatus();
  }

  private initializeSelectedParagraph() {
    const storedSelectedParagraph = localStorage.getItem('selectedParagraph');

    if (storedSelectedParagraph) {
      this.selectedParagraph = JSON.parse(storedSelectedParagraph);
    } else {
      localStorage.setItem('selectedParagraph', JSON.stringify(this.selectedParagraph));
    }
  }

  private initializeWatchtowerCustomEndTime() {
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

  setTimeWatchtowerLastPart(endTime: Date) {
    endTime.setHours(
      this.watchtowerLastPart.hours,
      this.watchtowerLastPart.minutes,
      this.watchtowerLastPart.seconds
    );
  }

  setSelectedParagraphToLocalStorage(paragraph: number) {
    localStorage.setItem('selectedParagraph', JSON.stringify(paragraph));
    this.selectedParagraph = paragraph;
  }

  setWatchtowerCustomTimeToLocalStorage(watchtowerEndTime: any) {
    localStorage.setItem('watchtowerCustomEndTime', JSON.stringify(watchtowerEndTime));
    this.watchtowerCustomEndTime = watchtowerEndTime;
  }

  setAsCustomTimeToLocalStorage(isCustomTime: any) {
    localStorage.setItem('isCustomTime', JSON.stringify(isCustomTime));
    this.isCustomTime = isCustomTime;
  }

  getWatchtowerCustomEndTime(): AllEvents {
    return this.watchtowerCustomEndTime;
  }

  getCustomTimeStatus(): boolean {
    return this.isCustomTime;
  }

  getSelectedParagraph(): number {
    return this.selectedParagraph;
  }
}
