import {AfterViewChecked, Component, Input, WritableSignal} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {combineLatest, map, Observable} from "rxjs";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {Store} from "@ngrx/store";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";
import {AllEvents} from "../../../model/events";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements AfterViewChecked {
  @Input() introduction: boolean = false;
  @Input() finish: boolean = false;

  protected readonly faArrowLeft = faArrowLeft;
  protected selectedSpeechSig!: WritableSignal<AllEvents>;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    public selectedSpeechService: SelectedSpeechService
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  ngAfterViewChecked() {
    this.updateRemainingTimeIfNecessary();
  }

  private updateRemainingTimeIfNecessary() {
    let shouldExit = false;

    this.selectedSpeechSig = this.selectedSpeechService.selectedSpeechSig;

    if (this.selectedSpeechSig().title === 'Cuvinte de încheiere, anunțuri') {
      shouldExit = true;
    }

    if (shouldExit) {
      return;
    }

    if (this.countdownService.remainingTime > this.countdownAllocatedTimeService.remainingAllocatedTime) {
      this.countdownService.remainingTime = this.countdownAllocatedTimeService.remainingAllocatedTime + 1;
      console.log('countdownService remainingTime is bigger than countdownAllocatedTimeService');
    }
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
      })
    );
  }

  protected roundUp(duration: number): number {
    return Math.floor(duration);
  }
}
