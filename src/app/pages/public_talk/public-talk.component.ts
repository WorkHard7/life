import {Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-public-talk',
  templateUrl: './public-talk.component.html',
  styleUrls: ['./public-talk.component.scss']
})
export class PublicTalkComponent {

  constructor(private countdownService: CountdownService) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }
}
