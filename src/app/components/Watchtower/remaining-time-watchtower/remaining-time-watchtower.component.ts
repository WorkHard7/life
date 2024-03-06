import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-remaining-time-watchtower',
  templateUrl: './remaining-time-watchtower.component.html',
  styleUrls: ['./remaining-time-watchtower.component.scss']
})
export class RemainingTimeWatchtowerComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    public countdownService: CountdownService,
    private router: Router
  ) {
  }

  timeIsUp(): boolean {
    return this.countdownService.showNegativeRemainingTime.sign.includes('-');
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/watchtower']);
  }
}
