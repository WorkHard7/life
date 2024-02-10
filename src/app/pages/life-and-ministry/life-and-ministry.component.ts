import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";
import {Events} from "../../model/events";
import {HeaderService} from "../../services/header.service";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit, AfterViewInit {
  title = 'Viața creștină și predicarea';
  parts!: Events[];
  redColor: boolean = false;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.headerService.showHeaderAgain();

    this.countdownService.stopCountdown();
  }

  constructor(
    public countdownService: CountdownService,
    private partsService: PartsService,
    public headerService: HeaderService
  ) {
  }

  ngAfterViewInit() {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  ngOnInit(): void {
    this.partsService.gems.subscribe(parts => {
      this.parts = parts;
    });

    console.log(this.parts)
  }
}
