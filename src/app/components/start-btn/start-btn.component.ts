import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-start-btn',
  templateUrl: './start-btn.component.html',
  styleUrls: ['./start-btn.component.scss']
})
export class StartBtnComponent implements OnInit {
  redColor: boolean = false;

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }
}
