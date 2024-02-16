import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-remaining-time-watchtower',
  templateUrl: './remaining-time-watchtower.component.html',
  styleUrls: ['./remaining-time-watchtower.component.scss']
})
export class RemainingTimeWatchtowerComponent implements OnInit {
  protected readonly faArrowLeft = faArrowLeft;
  redColorText: boolean = false;

  constructor(
    public countdownService: CountdownService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    });
  }

  timeIsUp(): boolean {
    return this.countdownService.showNegativeRemainingTime.includes('-');
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/watchtower']);
  }
}
