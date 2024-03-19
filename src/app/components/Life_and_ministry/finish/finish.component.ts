import {Component, OnInit, Signal} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";
import {AllEvents} from "../../../model/events";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  bibleStudyDurationSig!: Signal<number>;
  newIndexFinishPartSig!: Signal<number>;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;
  finishPart: AllEvents = {
    index: this.newIndexFinishPartSig,
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
    this.bibleStudyDurationSig = this.partsService.bibleStudyDurationSig;
    this.newIndexFinishPartSig = this.partsService.newIndexFinishPartSig;
  }
}
