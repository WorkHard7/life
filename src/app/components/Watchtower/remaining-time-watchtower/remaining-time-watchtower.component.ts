import {Component} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {HeaderService} from "../../../services/header.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-remaining-time-watchtower',
  templateUrl: './remaining-time-watchtower.component.html',
  styleUrls: ['./remaining-time-watchtower.component.scss']
})
export class RemainingTimeWatchtowerComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private headerService: HeaderService,
    private router: Router
  ) {
  }

  timeIsUp(): boolean {
    return this.countdownService.showNegativeRemainingTime.sign.includes('-');
  }

  mixColors() {
    if (this.timersRunOutOfTime()) {
      return '#f3b8b8';
    } else return '#F2F5B8';
  }

  timersRunOutOfTime(): boolean {
    return ((this.countdownService.isTimerRunning && this.countdownService.remainingTime <= 0) ||
      (this.countdownAllocatedTimeService.remainingAllocatedTime <= 0 &&
        this.countdownAllocatedTimeService.isAllocatedTimerRunning));
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
    this.headerService.showHeaderAgain();

    this.router.navigate(['/watchtower']);
  }
}
