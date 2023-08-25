import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-reset-time-btn',
  templateUrl: './reset-time-btn.component.html',
  styleUrls: ['./reset-time-btn.component.scss']
})
export class ResetTimeBtnComponent implements OnInit {
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  onBtnClick() {
    this.countdownService.stopCountdown();
  }
}
