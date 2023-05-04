import {Component, OnInit} from '@angular/core';
import {SPEECHES} from "../../mock/mock-parts.service";
import {ProcessParts} from "../../model/process-parts";
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit {
  title = 'ministry_app';
  parts!: ProcessParts[];
  redColor: boolean = false;

  constructor(public countdownService: CountdownService) {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  ngOnInit(): void {
    this.parts = SPEECHES;
  }
}
