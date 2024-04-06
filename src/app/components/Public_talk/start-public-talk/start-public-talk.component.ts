import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start-public-talk',
  templateUrl: './start-public-talk.component.html',
  styleUrls: ['./start-public-talk.component.scss']
})
export class StartPublicTalkComponent extends SharedUtilsComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private countdownService: CountdownService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected startTimer() {
    this.fireLoadingAlert();

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 30 * 60000); // Adding 30 minutes to current time

    this.countdownService.startCountdown(endTime);
    this.router.navigate(['start'], {relativeTo: this.route});
  }
}
