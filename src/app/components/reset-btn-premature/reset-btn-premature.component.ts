import {Component} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-reset-btn-premature',
  templateUrl: './reset-btn-premature.component.html',
  styleUrls: ['./reset-btn-premature.component.scss']
})
export class ResetBtnPrematureComponent {
  constructor(private countdownService: CountdownService) {
  }

  onBtnClick() {
    this.countdownService.stopCountdown();
  }
}
