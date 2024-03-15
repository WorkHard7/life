import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-left-controllers-public-talk',
  templateUrl: './left-controllers-public-talk.html',
  styleUrls: ['./left-controllers-public-talk.scss']
})
export class LeftControllersPublicTalk {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private router: Router
  ) {
  }

  startNextSpeech() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/watchtower']);
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/public_talk']);
  }
}
