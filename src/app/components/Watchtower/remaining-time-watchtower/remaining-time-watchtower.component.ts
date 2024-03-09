import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-remaining-time-watchtower',
  templateUrl: './remaining-time-watchtower.component.html',
  styleUrls: ['./remaining-time-watchtower.component.scss']
})
export class RemainingTimeWatchtowerComponent {
  constructor(
    public countdownService: CountdownService
  ) {
  }

  timeIsUp(): boolean {
    return this.countdownService.showNegativeRemainingTime.sign.includes('-');
  }
}
