import {Component} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";

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
    private countdownAllocatedTimeService: CountdownAllocatedTimeService
  ) {
    this.faArrowLeft = faArrowLeft;
  }

  protected returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/watchtower']);
  }
}
