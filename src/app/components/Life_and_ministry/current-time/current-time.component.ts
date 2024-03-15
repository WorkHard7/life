import {Component, Input, OnInit} from '@angular/core';
import {faArrowLeft, faClock} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {selectHeader} from "../../../store/selectors/showHeader.selector";

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  @Input() watchtowerStarted: boolean = false;
  @Input() publicTalk: boolean = false;
  localTime: any = new Date();
  title: string = '';
  showHeader$!: Observable<boolean>;
  public readonly faClock: any = faClock;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService
  ) {
    this.showHeader$ = this.store.select(selectHeader);
  }

  ngOnInit(): void {
    this.updateLocalTime();
  }

  updateLocalTime() {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }

  goHome() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/']);
  }
}
