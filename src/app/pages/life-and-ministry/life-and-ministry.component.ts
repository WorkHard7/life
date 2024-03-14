import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";
import {AllEvents} from "../../model/events";
import {HeaderService} from "../../services/header.service";
import {CountdownAllocatedTimeService} from "../../services/countdown-allocated-time.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit, OnDestroy {
  title = 'Viața creștină și predicarea';
  partsServiceSubscription!: Subscription;
  parts!: AllEvents[];

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService,
    public headerService: HeaderService
  ) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: AllEvents) {
    this.headerService.showHeaderAgain();

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
