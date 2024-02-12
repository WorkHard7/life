import {Component, Input, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-start-btn',
  templateUrl: './start-btn.component.html',
  styleUrls: ['./start-btn.component.scss']
})
export class StartBtnComponent implements OnInit {
  @Input() padding?: string;
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

  hideHeader() {
    this.headerService.hideHeader();
  }
}
