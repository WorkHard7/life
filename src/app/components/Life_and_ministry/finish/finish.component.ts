import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllEvents} from "../../../model/events";
import {PartsService} from "../../../services/parts.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit, OnDestroy {
  bibleStudyDuration: number = 3;
  newIndexFinishPart: number = 7;
  bibleStudyDurationSubscription!: Subscription;
  newIndexFinishPartSubscription!: Subscription;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;
  finishPart: AllEvents = {
    index: this.newIndexFinishPart,
    title: 'Cuvinte de încheiere, anunțuri',
    hours: 20,
    minutes: 40,
    seconds: 0,
    duration: 3
  };

  constructor(
    private store: Store<AppState>,
    private partsService: PartsService
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  ngOnInit(): void {
    this.bibleStudyDurationSubscription = this.partsService.bibleStudyDuration.subscribe(duration => {
      this.bibleStudyDuration = duration;
    })

    this.newIndexFinishPartSubscription = this.partsService.newIndexFinishPart.subscribe((newIndexFinishPart) => {
      this.newIndexFinishPart = newIndexFinishPart;
    })
  }

  ngOnDestroy() {
    this.bibleStudyDurationSubscription.unsubscribe();
    this.newIndexFinishPartSubscription.unsubscribe();
  }
}
