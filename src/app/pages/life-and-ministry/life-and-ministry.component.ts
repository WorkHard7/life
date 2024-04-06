import {Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {AllEvents} from "../../model/events";
import {CountdownAllocatedTimeService} from "../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent {
  constructor(
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService
  ) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: AllEvents) {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
  }
}
