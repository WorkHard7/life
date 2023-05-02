import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit{
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
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

  resetBgColor() {
    this.countdownService.resetBgColor();
  }
}
