import {Component} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-left-controllers-watchtower',
  templateUrl: './left-controllers-watchtower.component.html',
  styleUrls: ['./left-controllers-watchtower.component.scss']
})
export class LeftControllersWatchtowerComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private router: Router,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private headerService: HeaderService
  ) {
    this.faArrowLeft = faArrowLeft;
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
    this.headerService.showHeaderAgain();

    this.router.navigate(['/watchtower']);
  }
}
