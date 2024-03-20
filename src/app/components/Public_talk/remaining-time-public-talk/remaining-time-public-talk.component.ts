import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-remaining-time-public-talk',
  templateUrl: './remaining-time-public-talk.component.html',
  styleUrls: ['./remaining-time-public-talk.component.scss']
})
export class RemainingTimePublicTalkComponent {

  constructor(protected countdownService: CountdownService) {
  }
}
