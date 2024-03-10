import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";
import {faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-set-custom-time-btn-watchtower',
  templateUrl: './set-custom-time-btn-watchtower.component.html',
  styleUrls: ['./set-custom-time-btn-watchtower.component.scss']
})
export class SetCustomTimeBtnWatchtowerComponent implements OnInit {
  faClockRotateLeft = faClockRotateLeft;
  watchtowerEndTime: any = {};
  isCustomTime: boolean = false;

  constructor(private countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.watchtowerEndTime = this.countdownService.getWatchtowerCustomEndTime();
    this.isCustomTime = this.countdownService.getCustomTimeStatus();

    // in case it's undefined
    if (this.watchtowerEndTime === undefined) {
      this.setEveningTime();

      this.countdownService.setWatchtowerCustomTimeToLocalStorage(this.watchtowerEndTime);
    }
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
        const inputHoursEl = document.getElementById('swal-input-hours') as HTMLInputElement;
        const inputMinutesEl = document.getElementById('swal-input-minutes') as HTMLInputElement;
        const setTimeBtn = document.querySelector('.swal2-confirm') as HTMLElement;

        if (inputHoursEl) {
          inputHoursEl.focus();

          inputMinutesEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent default form submission
              setTimeBtn.click();
            }
          })
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
          title: 'Turnul de veghe',
          hours: hours,
          minutes: minutes,
          seconds: 0,
          duration: 60
        };
        console.log('watchtowerEndTime', this.watchtowerEndTime);
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.isCustomTime = true;
        this.updateLocalStorageKeys();
      }
    })
  }

  changeToMorningTime() {
    this.isCustomTime = false;
    this.setMorningTime();
    this.updateLocalStorageKeys();
  }

  changeToEveningTime() {
    this.isCustomTime = false;
    this.setEveningTime();
    this.updateLocalStorageKeys();
  }

  updateLocalStorageKeys() {
    this.countdownService.setWatchtowerCustomTimeToLocalStorage(this.watchtowerEndTime);
    this.countdownService.setAsCustomTimeToLocalStorage(this.isCustomTime);
  }

  private setMorningTime() {
    this.watchtowerEndTime = {
      hours: '11',
      minutes: '40',
      seconds: 0
    };
  }

  private setEveningTime() {
    this.watchtowerEndTime = {
      hours: '20',
      minutes: '10',
      seconds: 0
    };
  }

  noMorningNoEveningSelected(): boolean {
    return (this.watchtowerEndTime?.hours != 11 || this.watchtowerEndTime?.minutes != 40)
      && (this.watchtowerEndTime?.hours != 20 || this.watchtowerEndTime?.minutes != 10);
  }
}
