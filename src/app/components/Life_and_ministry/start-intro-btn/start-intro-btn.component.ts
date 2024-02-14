import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-start-intro-btn',
  templateUrl: './start-intro-btn.component.html',
  styleUrls: ['./start-intro-btn.component.scss']
})
export class StartIntroBtnComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private countdownService: CountdownService,
    private headerService: HeaderService
  ) {
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

  startTimer() {
    this.fireLoadingAlert();

    const endTime = new Date();
    endTime.setHours(19, 5, 30, 0); // 19:05:30

    this.countdownService.startCountdown(endTime);
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
