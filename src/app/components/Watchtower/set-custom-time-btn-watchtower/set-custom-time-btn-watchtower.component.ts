import {Component, EventEmitter, Output} from '@angular/core';
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-set-custom-time-btn-watchtower',
  templateUrl: './set-custom-time-btn-watchtower.component.html',
  styleUrls: ['./set-custom-time-btn-watchtower.component.scss']
})
export class SetCustomTimeBtnWatchtowerComponent {
  @Output() newEndTime: EventEmitter<Object> = new EventEmitter<Object>();
  faClockRotateLeft = faClockRotateLeft;
  endTime: any = {};
  customTime: boolean = false;

  constructor(private countdownService: CountdownService) {
    this.endTime = this.countdownService.getCustomEndTime();
  }

  changeTime(): void {
    Swal.fire({
      title: 'Setează timpul',
      html: `
        <input id="swal-input-hours" class="swal2-input" placeholder="Ora finisarii" type="number" min="0">
        <input id="swal-input-minutes" class="swal2-input" placeholder="Minute" type="number" min="0" max="59">
      `,
      showCancelButton: true,
      confirmButtonText: 'Setează',
      cancelButtonText: 'Anulează',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const hours = (document.getElementById('swal-input-hours') as HTMLInputElement).value;
        const minutes = (document.getElementById('swal-input-minutes') as HTMLInputElement).value;

        if (!hours || !minutes) {
          Swal.showValidationMessage('Completează toate câmpurile');
        }

        this.endTime = {
          hours: hours,
          minutes: minutes,
          seconds: 0
        };
        console.log(this.endTime);
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customTime = true;
        this.countdownService.setCustomEndTime(this.endTime);

        Swal.fire({
          title: 'Succes',
          text: 'Timpul a fost setat cu succes',
          icon: 'success'
        })
      }
    })
  }

  changeToMorningTime() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          Swal.close();
          this.customTime = false;

          this.setMorningTime();
          this.countdownService.setCustomEndTime(this.endTime);

          Swal.fire({
            title: 'Succes',
            text: 'Timpul a fost setat cu succes: 11:38',
            showConfirmButton: false,
            timer: 2000,
            icon: 'success'
          });
        }, 1500);
      }
    });
  }

  changeToEveningTime() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          Swal.close();
          this.customTime = false;

          this.setEveningTime();
          this.countdownService.setCustomEndTime(this.endTime);

          Swal.fire({
            title: 'Succes',
            text: 'Timpul pentru finalizare: 19:38',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success'
          });
        }, 1000);
      }
    });
  }

  private setMorningTime() {
    this.endTime = {
      hours: 11,
      minutes: 38,
      seconds: 0
    };
  }

  private setEveningTime() {
    this.endTime = {
      hours: 19,
      minutes: 38,
      seconds: 0
    };
  }
}
