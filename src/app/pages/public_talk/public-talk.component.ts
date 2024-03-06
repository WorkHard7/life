import {Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-public-talk',
  templateUrl: './public-talk.component.html',
  styleUrls: ['./public-talk.component.scss']
})
export class PublicTalkComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    public countdownService: CountdownService,
    private router: Router
  ) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/public_talk']);
  }
}
