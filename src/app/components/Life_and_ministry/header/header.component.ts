import {Component, Input} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('title') header?: string;
  @Input() selectedSpeech?: string;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private router: Router,
    private countdownService: CountdownService,
    public headerService: HeaderService
  ) {
  }

  goHome() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/']);
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.headerService.showHeaderAgain();

    this.router.navigate(['/life_and_ministry']);
  }
}
