import {Component, EventEmitter, Input, Output} from '@angular/core';
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent {
  @Output() finishTitleEmitted: EventEmitter<string> = new EventEmitter<string>();
  @Output() introTitleEmitted: EventEmitter<string> = new EventEmitter<string>();
  @Input() introTitle: any;
  @Input() finishTitle: any;
  @Input() finishIntroTime: any;
  @Input() finishTime: any;

  constructor(
    private countdownService: CountdownService,
    private headerService: HeaderService
  ) {
  }

  startTimer() {
    this.fireLoadingAlert();

    const endTime = new Date();
    this.findEndingTime(endTime);

    this.countdownService.startCountdown(endTime);
  }

  private fireLoadingAlert() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()

        setTimeout(() => {
          Swal.close();
        }, 1000);
      }
    });
  }

  findEndingTime(endTime: Date) {
    if (this.finishIntroTime) {
      endTime.setHours(this.finishIntroTime.hour, this.finishIntroTime.minutes, this.finishIntroTime.seconds); // 19:05:30
      this.introTitleEmitted.emit(this.introTitle);
    } else if (this.finishTime) {
      endTime.setHours(this.finishTime.hour, this.finishTime.minutes, this.finishTime.seconds); // 20:40:00
      this.finishTitleEmitted.emit(this.finishTitle);
    }
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
