import {Component, HostListener, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";
import {Events} from "../../model/events";
import {HeaderService} from "../../services/header.service";
import {CountdownAllocatedTimeService} from "../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit {
  title = 'Viața creștină și predicarea';
  parts!: Events[];

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService,
    public headerService: HeaderService
  ) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.headerService.showHeaderAgain();

    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
  }

  ngOnInit(): void {
    this.partsService.gems.subscribe(parts => {
      this.parts = parts;
    });

    console.log(this.parts)
  }
}
