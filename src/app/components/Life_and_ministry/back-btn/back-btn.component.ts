import {Component, Input, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit {
  @Input() publicTalk!: boolean;
  redColorText: boolean = false;

  constructor(
    public countdownService: CountdownService,
    private headerService: HeaderService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  onBtnClick() {
    this.countdownService.stopCountdown();

    this.showHeader();
  }

  showHeader() {
    this.headerService.showHeaderAgain();
  }
}
