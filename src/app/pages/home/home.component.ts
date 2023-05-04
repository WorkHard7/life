import {Component, OnInit} from '@angular/core';
import {SPEECHES} from "../../mock/mock-parts.service";
import {ProcessParts} from "../../model/process-parts";
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
