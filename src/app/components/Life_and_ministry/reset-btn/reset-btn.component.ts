import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-reset-btn',
  templateUrl: './reset-btn.component.html',
  styleUrls: ['./reset-btn.component.scss']
})
export class ResetBtnComponent implements OnInit {
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  resetBgColor() {
    this.countdownService.resetBgColor();
  }
}
