import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {WatchtowerService} from "../../../services/watchtower.service";

@Component({
  selector: 'app-set-custom-time',
  templateUrl: './set-custom-time.component.html',
  styleUrls: ['./set-custom-time.component.scss']
})
export class SetCustomTimeComponent implements OnInit {
  protected watchtowerEndTime: any = {};
  protected isCustomTime: boolean = false;

  constructor(private watchtowerService: WatchtowerService) {
  }

  ngOnInit(): void {
    this.watchtowerEndTime = this.watchtowerService.getWatchtowerCustomEndTime();
    this.isCustomTime = this.watchtowerService.getCustomTimeStatus();

    // in case it's undefined
    if (this.watchtowerEndTime === undefined) {
      this.setEveningTime();

      this.watchtowerService.setWatchtowerCustomTimeToLocalStorage(this.watchtowerEndTime);
    }
  }

  protected changeWatchtowerEndTime(): void {
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

  protected changeToMorningTime() {
    this.isCustomTime = false;
    this.setMorningTime();
    this.updateLocalStorageKeys();
  }

  protected changeToEveningTime() {
    this.isCustomTime = false;
    this.setEveningTime();
    this.updateLocalStorageKeys();
  }

  private updateLocalStorageKeys() {
    this.watchtowerService.setWatchtowerCustomTimeToLocalStorage(this.watchtowerEndTime);
    this.watchtowerService.setAsCustomTimeToLocalStorage(this.isCustomTime);
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

  protected noMorningNoEveningSelected(): boolean {
    return (this.watchtowerEndTime?.hours != 11 || this.watchtowerEndTime?.minutes != 40)
      && (this.watchtowerEndTime?.hours != 20 || this.watchtowerEndTime?.minutes != 10);
  }
}
