import {Component, Input, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit {
  @Input() textSize!: string;
  @Input() publicTalk!: boolean;
  redColorText: boolean = false;

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    });
  }

  timeIsUp(): boolean {
    return this.countdownService.showNegativeRemainingTime.includes('-');
  }
}
