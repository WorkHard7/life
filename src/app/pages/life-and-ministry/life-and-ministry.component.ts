import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";
import {Events} from "../../model/events";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit, AfterViewInit {
  title = 'Viața creștină și predicarea';
  parts!: Events[];
  redColor: boolean = false;

  constructor(
    public countdownService: CountdownService,
    private partsService: PartsService
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
