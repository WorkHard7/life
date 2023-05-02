import {Component, OnInit} from '@angular/core';
import {ProcessParts} from "./model/process-parts";
import {SPEECHES} from "./mock/mock-parts.service";
import {CountdownService} from "./services/countdown.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ministry_app';
  parts!: ProcessParts[];
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  ngOnInit(): void {
    this.parts = SPEECHES;
  }
}
