import {Component, Input, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit {
  @Input() textSize!: string;
  @Input() publicTalk!: boolean;
  @Input() introduction!: boolean;
  @Input() finish!: boolean;

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
    this.router.navigate(['/life_and_ministry']);
  }
}
