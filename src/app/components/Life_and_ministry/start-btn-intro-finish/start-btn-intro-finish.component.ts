import {Component, EventEmitter, Input, Output} from '@angular/core';
import Swal from "sweetalert2";
import {HeaderService} from "../../../services/header.service";
import {IntroAndFinishPart} from "../../../model/events";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent {
  @Output() introPartEmitted: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();
  @Output() finishPartEmitted: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();
  @Input() introPart?: IntroAndFinishPart;
  @Input() finishPart?: IntroAndFinishPart;

  constructor(
    private CountdownAllocatedTimeService: CountdownAllocatedTimeService,
    private headerService: HeaderService
  ) {
  }

  startTimer() {
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
      endTime.setHours(this.introPart.endHours, this.introPart.endMinutes, this.introPart.endSeconds); // 19:05:15
      this.introPartEmitted.emit(this.introPart);
    } else if (this.finishPart) {
      endTime.setHours(this.finishPart.endHours, this.finishPart.endMinutes, this.finishPart.endSeconds); // 20:42:00
      this.finishPartEmitted.emit(this.finishPart);
    }
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
