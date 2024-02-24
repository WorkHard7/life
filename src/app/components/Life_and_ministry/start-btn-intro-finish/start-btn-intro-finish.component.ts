import {Component, EventEmitter, Input, Output} from '@angular/core';
import Swal from "sweetalert2";
import {HeaderService} from "../../../services/header.service";
import {Events} from "../../../model/events";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent {
  @Output() introPartEmitted: EventEmitter<Events> = new EventEmitter<Events>();
  @Output() finishPartEmitted: EventEmitter<Events> = new EventEmitter<Events>();
  @Input() introPart?: Events;
  @Input() finishPart?: Events;

  constructor(
    private countdownService: CountdownService,
    private CountdownAllocatedTimeService: CountdownAllocatedTimeService,
    private headerService: HeaderService
  ) {
  }

  startTimer() {
    if (this.introPart) {
      this.countdownService.compareAxisOfTime(this.introPart);
    } else if (this.finishPart) {
      this.countdownService.compareAxisOfTime(this.finishPart);
    }

    this.fireLoadingAlert();

    const endTime = new Date();
    this.findEndingTime(endTime);

    this.CountdownAllocatedTimeService.startCountdownForAllocatedTime(endTime);
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
    if (this.introPart) {
      endTime.setHours(this.introPart.hours, this.introPart.minutes, this.introPart.minutes); // 19:05:15
      this.introPartEmitted.emit(this.introPart);
    } else if (this.finishPart) {
      endTime.setHours(this.finishPart.hours, this.finishPart.minutes, this.finishPart.minutes); // 20:42:00
      this.finishPartEmitted.emit(this.finishPart);
    }
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
