import {Component, Input} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-start-btn',
  templateUrl: './start-btn.component.html',
  styleUrls: ['./start-btn.component.scss']
})
export class StartBtnComponent {
  @Input() padding?: string;
  @Input() title?: string;

  constructor(
    public countdownService: CountdownService,
    private headerService: HeaderService
  ) {
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
