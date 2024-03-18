import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";
import {AllEvents} from "../../model/events";
import {CountdownAllocatedTimeService} from "../../services/countdown-allocated-time.service";
import {Observable, Subscription} from "rxjs";
import {selectHeader} from "../../store/selectors/showHeader.selector";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {showHeader} from "../../store/actions/showHeader.actions";
import {selectIsTimeRunning} from "../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../store/selectors/isAllocatedTimeRunning.selector";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit, OnDestroy {
  title = 'Viața creștină și predicarea';
  partsServiceSubscription!: Subscription;
  parts!: AllEvents[];
  showHeader$!: Observable<boolean>;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService
  ) {
    this.showHeader$ = this.store.select(selectHeader);
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: AllEvents) {
    this.store.dispatch(showHeader());

    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
  }

  ngOnInit(): void {
    this.partsServiceSubscription = this.partsService.gems.subscribe(parts => {
      this.parts = parts;
    });

    console.log(this.parts)
  }

  ngOnDestroy() {
    this.partsServiceSubscription.unsubscribe();
  }
}
