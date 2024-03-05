import {Component, Input} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {HeaderService} from "../../../services/header.service";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-left-controllers',
  templateUrl: './left-controllers.component.html',
  styleUrls: ['./left-controllers.component.scss']
})
export class LeftControllersComponent {
  @Input() publicTalk: boolean = false;
  @Input() watchtower: boolean = false;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    public headerService: HeaderService,
    private router: Router
  ) {
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
    this.headerService.showHeaderAgain();

    if (this.publicTalk) {
      this.router.navigate(['/public_talk']);
    } else if (this.watchtower) {
      this.router.navigate(['/watchtower']);
    } else {
      this.router.navigate(['/life_and_ministry']);
    }
  }

  onBtnClick() {
    if (this.publicTalk) {
      this.countdownService.stopCountdown();
      this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

      this.router.navigate(['/watchtower']);
    }
  }
}
