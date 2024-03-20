import {Component} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {map, combineLatest, Observable} from "rxjs";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";

@Component({
  selector: 'app-remaining-time-watchtower',
  templateUrl: './remaining-time-watchtower.component.html',
  styleUrls: ['./remaining-time-watchtower.component.scss']
})
export class RemainingTimeWatchtowerComponent {
  protected readonly faArrowLeft = faArrowLeft;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  protected mixColors(): Observable<string> {
    return this.timersRunOutOfTime().pipe(
      map(isTimeRunningOutOfTime => isTimeRunningOutOfTime ? '#f3b8b8' : '#F2F5B8')
    );
  }

  private timersRunOutOfTime(): Observable<boolean> {
    return combineLatest([this.isTimeRunning$, this.isAllocatedTimeRunning$]).pipe(
      map(([isTimeRunning, isAllocatedTimeRunning]) => {
          return (
            (isTimeRunning && this.countdownService.remainingTime <= 0) ||
            (this.countdownAllocatedTimeService.remainingAllocatedTime <= 0 && isAllocatedTimeRunning)
          );
        }
      ));
  }
}
