import {Injectable} from '@angular/core';
import {CHRISTIAN_LIFE, GEMS, PREACHING} from "../mock/mock-parts.service";
import {BehaviorSubject} from "rxjs";
import {Events} from "../model/events";
import Swal from "sweetalert2";

function updateDuration(value: number) {
  const durationInput = document.getElementById('swal-input-duration') as HTMLInputElement;
  if (durationInput) {
    durationInput.value = value.toString();
  }

  const hoursInput = document.getElementById('swal-input-hours') as HTMLInputElement;
  hoursInput.focus();
}

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  public gems: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public preachingParts: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public christianLifeParts: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() {
    const gems = localStorage.getItem('gems');
    const preachingParts = localStorage.getItem('preaching');
    const christianLifeParts = localStorage.getItem('christianLife');

    this.getGemsFromStorage(gems);
    this.getPreachingPartsFromStorage(preachingParts);
    this.getChristianLifePartsFromStorage(christianLifeParts);
  }

  addCustomSpeech(preaching: boolean = false, christianLife: boolean = false): void {
    Swal.fire({
      title: 'Adaugă o temă nouă',
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Titlul temei" type="text">
        <label for="swal-input-duration">Durata temei</label>
        <input id="swal-input-duration" class="swal2-input" placeholder="min." type="number">
        <div id="duration-container">
            <button id="duration-button-2" class="duration-button">2</button>
            <button id="duration-button-3" class="duration-button">3</button>
            <button id="duration-button-4" class="duration-button">4</button>
            <button id="duration-button-5" class="duration-button">5</button>
            <button id="duration-button-7" class="duration-button">7</button>
            <button id="duration-button-8" class="duration-button">8</button>
            <button id="duration-button-10" class="duration-button">10</button>
        </div>
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="2">
            <input id="swal-input-minutes" class="swal2-input" placeholder="min." type="number" min="0" max="59">
        </div>
      `,
      didOpen() {
        const buttonDurations = [
          { id: 'duration-button-2', duration: 2 },
          { id: 'duration-button-3', duration: 3 },
          { id: 'duration-button-4', duration: 4 },
          { id: 'duration-button-5', duration: 5 },
          { id: 'duration-button-7', duration: 7 },
          { id: 'duration-button-8', duration: 8 },
          { id: 'duration-button-10', duration: 10 }
        ];

        buttonDurations.forEach(button => {
          const durationButton = document.getElementById(button.id);
          if (durationButton) {
            durationButton.addEventListener('click', () => updateDuration(button.duration));
          }
        });

        const inputTitleEl = document.getElementById('swal-input-title');
        const inputMinutesEl = document.getElementById('swal-input-minutes') as HTMLInputElement;
        const addPartBtn = document.querySelector('.swal2-confirm') as HTMLElement;

        if (inputTitleEl) {
          inputTitleEl.focus();

          inputMinutesEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent default form submission
              addPartBtn.click();
            }
          })
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Adaugă',
      cancelButtonText: 'Anulează',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = (document.getElementById('swal-input-title') as HTMLInputElement).value;
        const hours = (document.getElementById('swal-input-hours') as HTMLInputElement).value;
        const minutes = (document.getElementById('swal-input-minutes') as HTMLInputElement).value;
        const duration = (document.getElementById('swal-input-duration') as HTMLInputElement).value;

        if (!title || !hours || !minutes || !duration) {
          Swal.showValidationMessage('Completează toate câmpurile');
        }

        return {title: title, hours: hours, minutes: minutes, duration: Number(duration + '.02')};
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const newSpeech = {
          title: result.value.title + ` (${result.value.hours}:${result.value.minutes})`!,
          hours: result.value.hours,
          minutes: result.value.minutes,
          duration: result.value.duration
        };

        if (preaching) {
          this.updatePreachingParts(newSpeech);
        } else if (christianLife) {
          this.updateChristianLifePartsAfterAddingANewPart(newSpeech);
        } else {
          this.updateSpeeches(newSpeech);
        }

        Swal.fire({
          title: `Tema a fost adaugată cu succes!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })
  }

  findAndEditPreachingParts(preachingPartToBeEdited: any) {
    const parts = this.preachingParts.getValue();
    const partToBeEdited = parts.find((part: any) => part.title === preachingPartToBeEdited.title);

    if (partToBeEdited !== -1) {
      const findIndex = parts.findIndex((part: any) => part === partToBeEdited);
      this.editPreachingAndChristianPart(partToBeEdited, findIndex, 'preaching');
    } else {
      console.log('preaching part was not found!')
    }
  }

  findAndEditChristianLifeParts(christianLifePartToBeEdited: any) {
    const parts = this.christianLifeParts.getValue();
    const partToBeEdited = parts.find((part: any) => part.title === christianLifePartToBeEdited.title);

    if (partToBeEdited !== -1) {
      const findIndex = parts.findIndex((part: any) => part === partToBeEdited);
      this.editPreachingAndChristianPart(partToBeEdited, findIndex, 'christianLife');
    } else {
      console.log('christian life part was not found!')
    }
  }

  private editPreachingAndChristianPart(partToBeEdited: any, findIndex: number, preachingOrChristianLife: string) {
    Swal.fire({
      title: 'Editează tema',
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Titlul temei" autofocus
                value="${partToBeEdited.title}">
        <label for="swal-input-duration">Durata temei</label>
        <input id="swal-input-duration" class="swal2-input" placeholder="min" type="number"
        value="${partToBeEdited.duration}">
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="2"
                value="${partToBeEdited.hours}">
            <input id="swal-input-minutes" class="swal2-input" placeholder="min" type="number" min="0" max="59"
                value="${partToBeEdited.minutes}">
        </div>
      `,
      didOpen() {
        const inputTitleEl = document.getElementById('swal-input-title') as HTMLInputElement;
        const inputMinutesEl = document.getElementById('swal-input-minutes') as HTMLInputElement;
        const editTimeBtn = document.querySelector('.swal2-confirm') as HTMLElement;

        if (inputTitleEl) {
          inputTitleEl.focus();
          inputTitleEl.select();

          inputMinutesEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent default form submission
              editTimeBtn.click();
            }
          })
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Editează',
      cancelButtonText: 'Anulează',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = (document.getElementById('swal-input-title') as HTMLInputElement).value;
        const hours = (document.getElementById('swal-input-hours') as HTMLInputElement).value;
        const minutes = (document.getElementById('swal-input-minutes') as HTMLInputElement).value;
        const duration = (document.getElementById('swal-input-duration') as HTMLInputElement).value;

        if (!title || !hours || !minutes || !duration) {
          Swal.showValidationMessage('Completează toate câmpurile');
        }

        return {title: title, hours: hours, minutes: minutes, duration: Number(duration)};
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const editedPart = {
          title: result.value.title,
          hours: result.value.hours,
          minutes: result.value.minutes,
          duration: result.value.duration
        };

        if (preachingOrChristianLife === 'preaching') {
          this.updatePreachingPartsAfterEditing(editedPart, findIndex);
        } else if (preachingOrChristianLife === 'christianLife') {
          this.updateChristianLifePartsAfterEditing(editedPart, findIndex);
        }

        Swal.fire({
          title: `Tema a fost editată cu succes!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })
  }

  private updateChristianLifePartsAfterEditing(editedPart: any, findIndex: number) {
    const christianLifeParts = this.christianLifeParts.getValue();
    christianLifeParts[findIndex] = editedPart;

    localStorage.setItem('christianLife', JSON.stringify(christianLifeParts));
    this.christianLifeParts.next(christianLifeParts);
  }

  private updatePreachingPartsAfterEditing(editedPart: any, findIndex: number) {
    const preachingParts = this.preachingParts.getValue();
    preachingParts[findIndex] = editedPart;

    localStorage.setItem('preaching', JSON.stringify(preachingParts));
    this.preachingParts.next(preachingParts);
  }

  private updateSpeeches(newSpeech: Events): void {
    const parts = this.gems.getValue();
    parts.push(newSpeech);
    localStorage.setItem('gems', JSON.stringify(parts));

    this.gems.next(parts);
  }

  private updatePreachingParts(newSpeech: Events): void {
    const preachingParts = this.preachingParts.getValue();
    preachingParts.push(newSpeech);
    localStorage.setItem('preaching', JSON.stringify(preachingParts));

    this.preachingParts.next(preachingParts);
  }

  private updateChristianLifePartsAfterAddingANewPart(newSpeech: Events): void {
    let christianLifeParts = this.christianLifeParts.getValue();
    const bibleStudy = christianLifeParts.find((part: any) => part.title === 'Studiul Bibliei (20:06 - 20:36)');

    // removes "Studiul Bibliei" from the array if it exists
    christianLifeParts = christianLifeParts.filter((part: any) => part.title !== 'Studiul Bibliei (20:06 - 20:36)');
    // adds new part
    christianLifeParts.push(newSpeech);

    // Add "Studiul Bibliei" back to the end of the array to keep it always last
    if (bibleStudy) {
      christianLifeParts.push(bibleStudy);
    }

    localStorage.setItem('christianLife', JSON.stringify(christianLifeParts));

    this.christianLifeParts.next(christianLifeParts);
  }

  resetSpeeches(title: string, preaching: boolean = false, christianLife: boolean = false): void {
    Swal.fire({
      title: 'Ești sigur?',
      text: "Nu vei putea reveni la starea inițială!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Resetează',
      cancelButtonText: 'Anulează'
    }).then((result) => {
      if (result.isConfirmed) {

        if (preaching) {
          this.resetToDefaultPreachingParts();
        } else if (christianLife) {
          this.resetToDefaultChristianLifeParts();
        } else {
          this.resetToDefaultGems();
        }

        Swal.fire({
          title: `Toate discursurile au fost resetate!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      }
    });
  }

  findAndDeleteSpeech(title: string, preaching: boolean = false, christianLife: boolean = false): void {
    Swal.fire({
      title: 'Ești sigur?',
      text: "Ești pe cale de a șterge o temă!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Șterge',
      cancelButtonText: 'Anulează'
    }).then((result: any) => {
      if (result.isConfirmed) {

        if (preaching) {
          const filterPreachingParts = this.preachingParts.getValue().filter((part: any) =>
            part.title !== title);

          this.preachingParts.next(filterPreachingParts);
          localStorage.setItem('preaching', JSON.stringify(this.preachingParts.getValue()));
        } else if (christianLife) {
          const filterChristianLifeParts = this.christianLifeParts.getValue().filter((part: any) =>
            part.title !== title);

          this.christianLifeParts.next(filterChristianLifeParts);
          localStorage.setItem('christianLife', JSON.stringify(this.christianLifeParts.getValue()));
        }

        Swal.fire({
          title: `Tema a fost ștearsă cu succes!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })
  }

  private resetToDefaultGems(): void {
    localStorage.setItem('gems', JSON.stringify(GEMS));
    this.gems.next(GEMS);
  }

  private resetToDefaultPreachingParts(): void {
    localStorage.setItem('preaching', JSON.stringify(PREACHING));
    this.preachingParts.next(PREACHING);
  }

  private resetToDefaultChristianLifeParts(): void {
    localStorage.setItem('christianLife', JSON.stringify(CHRISTIAN_LIFE));
    this.christianLifeParts.next(CHRISTIAN_LIFE);
  }

  private getGemsFromStorage(gems: string | null): void {
    if (gems) {
      this.gems.next(JSON.parse(gems));
    } else {
      this.gems.next(GEMS);
      localStorage.setItem('gems', JSON.stringify(GEMS));
    }
  }

  private getPreachingPartsFromStorage(preachingParts: string | null) {
    if (preachingParts) {
      this.preachingParts.next(JSON.parse(preachingParts));
    } else {
      this.preachingParts.next(PREACHING);
      localStorage.setItem('preaching', JSON.stringify(PREACHING));
    }
  }

  private getChristianLifePartsFromStorage(christianLifeParts: string | null) {
    if (christianLifeParts) {
      this.christianLifeParts.next(JSON.parse(christianLifeParts));
    } else {
      this.christianLifeParts.next(CHRISTIAN_LIFE);
      localStorage.setItem('christianLife', JSON.stringify(CHRISTIAN_LIFE));
    }
  }
}
