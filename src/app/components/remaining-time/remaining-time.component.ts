import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit {
  redColor: boolean = false;

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  get remainingTime(): string {
    const minutes = Math.floor(this.countdownService.remainingTime / 60);
    const seconds = this.countdownService.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  formatRemainingTime(remainingTime: string): string | number {
    const timeParts = remainingTime.split(":");
    const minutes = Number(timeParts[0]);
    const seconds = Number(timeParts[1]);

    if (minutes >= 60) {
      const remainingHours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return `0${remainingHours} : ${formattedMinutes} : ${formattedSeconds}`;
    }
    return `${remainingTime}`;
  }
}
