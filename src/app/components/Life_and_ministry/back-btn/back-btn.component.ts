import {Component, Input} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent {
  @Input() publicTalk!: boolean;

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private headerService: HeaderService
  ) {
  }

  onBtnClick() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.showHeader();
  }

  showHeader() {
    this.headerService.showHeaderAgain();
  }
}
