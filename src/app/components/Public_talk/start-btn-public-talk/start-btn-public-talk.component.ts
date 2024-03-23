import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";

@Component({
  selector: 'app-start-btn-public-talk',
  templateUrl: './start-btn-public-talk.component.html',
  styleUrls: ['./start-btn-public-talk.component.scss']
})
export class StartBtnPublicTalkComponent extends SharedUtilsComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private countdownService: CountdownService,
    private router: Router
  ) {
    super();
  }

  protected startTimer() {
    this.fireLoadingAlert();

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 30 * 60000); // Adding 30 minutes to current time

    this.countdownService.startCountdown(endTime);
  }

  protected goHome() {
    this.router.navigate(['/']);
  }
}
