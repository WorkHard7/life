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
  watchtowerEndTime: any = {};
  customTime: boolean = false;

  constructor(private countdownService: CountdownService) {
    this.watchtowerEndTime = this.countdownService.getCustomEndTime();
  }

  changeWatchtowerEndTime(): void {
    Swal.fire({
      title: 'Setează timpul',
      html: `
    <div id="swal2-main-container">
    <label for="swal-input-hours">Ora finisării</label>
        <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="0">
        <input id="swal-input-minutes" class="swal2-input" placeholder="min" type="number" min="0" max="59">
    </div>
      `,
      didOpen() {
        const inputTitleEl = document.getElementById('swal-input-hours');
        if (inputTitleEl) {
          inputTitleEl.focus();
        }
      },
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

        this.watchtowerEndTime = {
          hours: hours,
          minutes: minutes,
          seconds: 0
        };
        console.log('watchtowerEndTime', this.watchtowerEndTime);
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.customTime = true;
        this.countdownService.setWatchtowerCustomEndTime(this.watchtowerEndTime);

        Swal.fire({
          title: 'Succes',
          text: 'Timpul a fost setat cu succes',
          showConfirmButton: false,
          timer: 1500,
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
          this.countdownService.setWatchtowerCustomEndTime(this.watchtowerEndTime);

          Swal.fire({
            title: 'Succes',
            text: 'Timpul a fost setat cu succes: 11:38',
            showConfirmButton: false,
            timer: 1500,
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
          this.countdownService.setWatchtowerCustomEndTime(this.watchtowerEndTime);

          Swal.fire({
            title: 'Succes',
            text: 'Timpul pentru finalizare: 20:08',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success'
          });
        }, 1500);
      }
    });
  }

  private setMorningTime() {
    this.watchtowerEndTime = {
      hours: 11,
      minutes: 38,
      seconds: 0
    };
  }

  private setEveningTime() {
    this.watchtowerEndTime = {
      hours: 20,
      minutes: '0' + 8,
      seconds: 0
    };
  }
}
