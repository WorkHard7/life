import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {AllEvents} from "../../../model/events";
import {PartsService} from "../../../services/parts.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Subscription} from "rxjs";

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
  finishPart: AllEvents = {
    index: this.newIndexFinishPart,
    title: 'Cuvinte de încheiere, anunțuri',
    hours: 20,
    minutes: 40,
    seconds: 0,
    duration: 3
  };

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService
  ) {
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
