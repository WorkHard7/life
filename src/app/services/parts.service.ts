import {Injectable} from '@angular/core';
import {CHRISTIAN_LIFE, GEMS, PREACHING} from "../mock/mock-parts.service";
import {BehaviorSubject} from "rxjs";
import {Events} from "../model/events";
import Swal from "sweetalert2";

function updateDuration(
  duration: number,
  christianLifeParts?: BehaviorSubject<any>,
  partToBeEdited?: Events
) {
  const durationInput = document.getElementById('swal-input-duration') as HTMLInputElement;
  if (durationInput) {
    durationInput.value = duration.toString();
  }

  const speechBContainer = document.getElementById('speech-B-container') as HTMLDivElement;
  const speechBHoursContainer = document.getElementById('speech-B-hours-container') as HTMLDivElement;
  const speechBHours = document.getElementById('swal-input-hours-speech-B') as HTMLInputElement;
  const speechBMinutes = document.getElementById('swal-input-minutes-speech-B') as HTMLInputElement;
  const speechBDuration = document.getElementById('swal-input-speech-B-duration') as HTMLInputElement;

  const line = document.getElementById('line') as HTMLInputElement;

  const hoursInput = document.getElementById('swal-input-hours') as HTMLInputElement;
  const minutesInput = document.getElementById('swal-input-minutes') as HTMLInputElement;
  const secondsInput = document.getElementById('swal-input-seconds') as HTMLInputElement;

  const BStudyHoursInput = document.getElementById('swal-input-hours-s-bible') as HTMLInputElement;
  const BStudyMinutesInput = document.getElementById('swal-input-minutes-s-bible') as HTMLInputElement;
  const BStudySecondsInput = document.getElementById('swal-input-seconds-s-bible') as HTMLInputElement;
  const BStudyDurationInput = document.getElementById('swal-input-duration-s-bible') as HTMLInputElement;

  let mainHours: string = '';
  let mainMinutes: string = '';
  let mainSeconds: string = '';
  let bStudyHours: string = '';
  let bStudyMinutes: string = '';
  let bStudySeconds: string = '20';
  let bStudyDuration: string = '';

  switch (duration) {
    case 2:
      bStudyHours = '20';
      bStudyMinutes = '34';
      bStudyDuration = '2';
      break;
    case 3:
      bStudyHours = '20';
      bStudyMinutes = '33';
      bStudyDuration = '3';
      break;
    case 5:
      mainHours = '19';
      mainMinutes = '55';
      mainSeconds = '40';
      bStudyHours = '20';
      bStudyMinutes = '31';
      bStudyDuration = '5';
      break;
    case 7:
      mainHours = '19';
      mainMinutes = '57';
      mainSeconds = '40';
      bStudyHours = '20';
      bStudyMinutes = '29';
      bStudyDuration = '7';
      break;
    case 8:
      mainHours = '19';
      mainMinutes = '58';
      mainSeconds = '40';
      bStudyHours = '19';
      bStudyMinutes = '59';
      break;
    case 10:
      mainHours = '20';
      mainMinutes = '00';
      mainSeconds = '40';
      bStudyHours = '20';
      bStudyMinutes = '26';
      bStudyDuration = '10';
      break;
    case 15:
      mainHours = '20';
      mainMinutes = '05';
      mainSeconds = '40';
      break;
  }

  if (hoursInput && minutesInput && secondsInput) {
    hoursInput.value = mainHours;
    minutesInput.value = mainMinutes;
    secondsInput.value = mainSeconds;
  } else if (BStudyHoursInput && BStudyMinutesInput && BStudySecondsInput && BStudyDurationInput) {
    BStudyHoursInput.value = bStudyHours;
    BStudyMinutesInput.value = bStudyMinutes;
    BStudySecondsInput.value = bStudySeconds;
    BStudyDurationInput.value = bStudyDuration;
  }

  if (partToBeEdited && partToBeEdited.title != 'Studiul Bibliei' && christianLifeParts?.getValue().length < 3) {
    if ([5, 7, 8, 10].includes(duration)) {
      speechBContainer.style.display = 'flex';
      speechBHoursContainer.style.display = 'flex';
      line.style.display = 'block';

      speechBDuration.value = (15 - duration).toString();
      speechBHours.value = '20';
      speechBMinutes.value = '06';
    } else {
      speechBContainer.style.display = 'none';
      speechBHoursContainer.style.display = 'none';
      line.style.display = 'none';
    }
  }
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
            <button id="duration-button-1" class="duration-button">1</button>
            <button id="duration-button-2" class="duration-button">2</button>
            <button id="duration-button-3" class="duration-button">3</button>
            <button id="duration-button-4" class="duration-button">4</button>
            <button id="duration-button-5" class="duration-button">5</button>
            <button id="duration-button-7" class="duration-button">7</button>
            <button id="duration-button-8" class="duration-button">8</button>
        </div>
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="2">
            <input id="swal-input-minutes" class="swal2-input" placeholder="min." type="number" min="0" max="59">
        </div>
      `,
      didOpen() {
        const buttonDurations = [
          {id: 'duration-button-1', duration: 1},
          {id: 'duration-button-2', duration: 2},
          {id: 'duration-button-3', duration: 3},
          {id: 'duration-button-4', duration: 4},
          {id: 'duration-button-5', duration: 5},
          {id: 'duration-button-7', duration: 7},
          {id: 'duration-button-8', duration: 8},
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

        return {title: title, hours: hours, minutes: minutes, duration: Number(duration)};
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const newSpeech = {
          title: result.value.title,
          hours: result.value.hours,
          minutes: result.value.minutes,
          seconds: 0,
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

  findAndEditChristianLifeParts(christianLifePartToBeEdited: any) {
    const parts = this.christianLifeParts.getValue();
    const partToBeEdited = parts.find((part: any) => part.title === christianLifePartToBeEdited.title);

    if (partToBeEdited !== -1) {
      const findIndex = parts.findIndex((part: any) => part === partToBeEdited);
      this.editPreachingAndChristianPart(partToBeEdited, findIndex);
    } else {
      console.log('christian life part was not found!')
    }
  }

  private editPreachingAndChristianPart(
    partToBeEdited: Events,
    index: number
  ) {
    let speech = '';
    let title = '';

    let buttonDurations = [
      {
        id: '',
        duration: 0
      }
    ];

    if (index === 0) {
      title = 'Editează temele';

      buttonDurations = [
        {id: 'duration-button-5', duration: 5},
        {id: 'duration-button-7', duration: 7},
        {id: 'duration-button-8', duration: 8},
        {id: 'duration-button-10', duration: 10},
        {id: 'duration-button-15', duration: 15}
      ];

      // in case not Studiul Bibliei was selected
      speech =
        `<input id="swal-input-title" class="swal2-input" placeholder="Titlul temei" value="Tema A">
        <div id="duration-container">
            <button id="duration-button-5" class="duration-button">5</button>
            <button id="duration-button-7" class="duration-button">7</button>
            <button id="duration-button-8" class="duration-button">8</button>
            <button id="duration-button-10" class="duration-button">10</button>
            <button id="duration-button-15" class="duration-button">15</button>
        </div>
        <label for="swal-input-duration">Durata temei</label>
        <input id="swal-input-duration" class="swal2-input" placeholder="min" type="number" value="15" readonly>
        <div id="swal2-main-container">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours" class="swal2-input" placeholder="ora" type="number" min="2"
                value="20">
            <input id="swal-input-minutes" class="swal2-input" placeholder="min" type="number" min="0" max="59"
                value="05">
            <input id="swal-input-seconds" class="swal2-input" placeholder="sec" type="number" min="0" max="59"
                value="40">
        </div>
        <div id="line" style="display: none;"></div>
        <div id="speech-B-container" style="display: none;">
            <label for="swal-input-speech-B-title"/>
            <input id="swal-input-speech-B-title" value="Tema B" class="swal2-input" placeholder="Titlul următoarei temei" readonly>
            <label for="swal-input-speech-B-duration">Durata temei</label>
            <input id="swal-input-speech-B-duration" class="swal2-input" placeholder="min" type="number">
        </div>
        <div id="speech-B-hours-container" style="display: none;">
            <label for="swal-input-hours-speech-B">Ora finisării</label>
            <input id="swal-input-hours-speech-B" class="swal2-input" placeholder="ora" type="number" min="2">
            <input id="swal-input-minutes-speech-B" class="swal2-input" placeholder="min" type="number" min="0" max="59">
            <input id="swal-input-seconds-speech-B" class="swal2-input" value="0" placeholder="sec" type="number" min="0" max="59"}">
        </div>
      `;
    } else if (partToBeEdited.title === 'Studiul Bibliei') {
      title = 'Scurtarea Studiului Bibliei';

      buttonDurations = [
        {id: 'duration-button-2', duration: 2},
        {id: 'duration-button-3', duration: 3},
        {id: 'duration-button-5', duration: 5},
        {id: 'duration-button-7', duration: 7},
        {id: 'duration-button-10', duration: 10},
      ];

      speech =
        `<div style="width: 90%; margin: 2rem auto">
            <p>Pentru a aloca mai mult timp anunțurilor,</p>
            <p>indică cu câte minute trebuie scurtat Studiul Bibliei</p>
         </div>
         <div id="duration-container-for-BStudy">
            <button id="duration-button-2" class="duration-button">2</button>
            <button id="duration-button-3" class="duration-button">3</button>
            <button id="duration-button-5" class="duration-button">5</button>
            <button id="duration-button-7" class="duration-button">7</button>
            <button id="duration-button-10" class="duration-button">10</button>
         </div>
         <div>
            <label for="swal-input-duration-s-bible">Durata de scurtare a temei</label>
            <input id="swal-input-duration-s-bible" class="swal2-input" placeholder="min" type="number" readonly>
         </div>
         <div id="swal2-main-container-forBStudy">
            <label for="swal-input-hours">Ora finisării</label>
            <input id="swal-input-hours-s-bible" class="swal2-input" placeholder="ora" type="number" min="2"
                value="20">
            <input id="swal-input-minutes-s-bible" class="swal2-input" placeholder="min" type="number" min="0" max="59"
                value="36">
            <input id="swal-input-seconds-s-bible" class="swal2-input" placeholder="sec" type="number" min="0" max="59"
                value="20">
         </div>
      `;
    }

    Swal.fire({
      title: title,
      html: speech,
      didOpen: () => {
        buttonDurations.forEach(button => {
          const durationButton = document.getElementById(button.id);
          if (durationButton) {
            durationButton.addEventListener('click', () =>
              updateDuration(button.duration, this.christianLifeParts, partToBeEdited));
          }
        });

        const inputTitleEl = document.getElementById('swal-input-title') as HTMLInputElement;
        const inputMinutesEl = document.getElementById('swal-input-minutes') as HTMLInputElement;
        const editTimeBtn = document.querySelector('.swal2-confirm') as HTMLElement;

        if (inputTitleEl) {
          inputMinutesEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault(); // Prevent default form submission
              editTimeBtn.click();
            }
          })
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Setează',
      cancelButtonText: 'Anulează',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const inputValues = this.validateInputs(partToBeEdited);
        console.log('inputValues', inputValues);

        if (!inputValues) {
          Swal.showValidationMessage('Completează toate câmpurile');
        }
        return inputValues;
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        console.log('partToBeEdited here', partToBeEdited);

        if (partToBeEdited.title != 'Studiul Bibliei') {
          this.updatedSpeechA(result, index);
        }

        this.checkAndAddSpeechB(result);

        this.editBibleStudyPart(partToBeEdited, result, index);

        Swal.fire({
          title: `Tema a fost editată cu succes!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      }
    })
  }

  updatedSpeechA(result: any, index: number) {
    const editedSpeechA = {
      title: result.value.title,
      hours: result.value.hours,
      minutes: result.value.minutes,
      seconds: result.value.seconds,
      duration: result.value.duration
    };

    this.updateChristianLifePartsAfterEditing(editedSpeechA, index);
  }

  private checkAndAddSpeechB(result: any) {
    // if the christianLifeParts has already 3 speeches..do not add the 4th using speech A
    // also if there are 2 speeches and Studiul Bibliei was selected, do not add a new speech
    if (this.christianLifeParts.getValue().length < 3 && result.value.speechBHours?.length > 1) {
      const newBSpeech = {
        title: result.value.speechBTitle,
        hours: result.value.speechBHours,
        minutes: result.value.speechBMinutes,
        seconds: 0,
        duration: result.value.speechBDuration
      }

      this.updateChristianLifePartsAfterAddingANewPart(newBSpeech);
    }
  }

  editBibleStudyPart(partToBeEdited: Events, result: any, index: number) {
    if (partToBeEdited.title == 'Studiul Bibliei') {
      const editedBStudy = {
        title: partToBeEdited.title,
        hours: result.value.speechBStudyHours,
        minutes: result.value.speechBStudyMinutes,
        seconds: result.value.speechBStudySeconds,
        duration: result.value.speechBStudyDuration
      };

      this.updateChristianLifePartsAfterEditing(editedBStudy, index);
    }
  }

  validateInputs(partToBeEdited: Events):
    {
      title?: string,
      hours?: string,
      minutes?: string,
      seconds?: string,
      duration?: number,
      speechBTitle?: string,
      speechBHours?: string,
      speechBMinutes?: string,
      speechBSeconds?: string,
      speechBDuration?: number,
      speechBStudyHours?: string,
      speechBStudyMinutes?: string,
      speechBStudySeconds?: string,
      speechBStudyDuration?: number
    } | null {

    // if Studiul Bibliei was not selected, validate main inputs
    if (partToBeEdited.title != 'Studiul Bibliei') {
      const title = (document.getElementById('swal-input-title') as HTMLInputElement)?.value;
      const hours = (document.getElementById('swal-input-hours') as HTMLInputElement)?.value;
      const minutes = (document.getElementById('swal-input-minutes') as HTMLInputElement)?.value;
      const seconds = (document.getElementById('swal-input-seconds') as HTMLInputElement)?.value;
      const duration = (document.getElementById('swal-input-duration') as HTMLInputElement)?.value;

      if (!title || !hours || !minutes || !seconds || !duration) {
        return null;
      }

      // if duration was selected so speechB is present, validate speechB inputs
      if ([5, 7, 8, 10].includes(Number(duration))) {
        const speechBTitle = (document.getElementById('swal-input-speech-B-title') as HTMLInputElement).value;
        const speechBHours = (document.getElementById('swal-input-hours-speech-B') as HTMLInputElement).value;
        const speechBMinutes = (document.getElementById('swal-input-minutes-speech-B') as HTMLInputElement).value;
        const speechBSeconds = (document.getElementById('swal-input-seconds-speech-B') as HTMLInputElement).value;
        const speechBDuration = (document.getElementById('swal-input-speech-B-duration') as HTMLInputElement).value;

        if (!speechBTitle || !speechBHours || !speechBMinutes || !speechBSeconds || !speechBDuration) {
          return null;
        }

        return {
          title,
          hours,
          minutes,
          seconds,
          duration: Number(duration),
          speechBTitle,
          speechBHours,
          speechBMinutes,
          speechBSeconds,
          speechBDuration: Number(speechBDuration)
        };
      }

      return {
        title,
        hours,
        minutes,
        seconds,
        duration: Number(duration)
      };
    } else {
      //  if Studiul Bibliei was selected, validate inputs
      const speechBStudyHours = (document.getElementById('swal-input-hours-s-bible') as HTMLInputElement)?.value;
      const speechBStudyMinutes = (document.getElementById('swal-input-minutes-s-bible') as HTMLInputElement)?.value;
      const speechBStudySeconds = (document.getElementById('swal-input-seconds-s-bible') as HTMLInputElement)?.value;
      const speechBStudyDuration = (document.getElementById('swal-input-duration-s-bible') as HTMLInputElement)?.value;

      const sBibleDuration = 30 - Number(speechBStudyDuration);

      if (!speechBStudyHours || !speechBStudyMinutes || !speechBStudySeconds || !speechBStudyDuration) {
        return null;
      }

      return {
        speechBStudyHours: speechBStudyHours,
        speechBStudyMinutes: speechBStudyMinutes,
        speechBStudySeconds: speechBStudySeconds,
        speechBStudyDuration: sBibleDuration
      };
    }
  }

  private updateChristianLifePartsAfterEditing(editedPart: any, index: number) {
    const christianLifeParts = this.christianLifeParts.getValue();
    christianLifeParts[index] = editedPart;

    localStorage.setItem('christianLife', JSON.stringify(christianLifeParts));
    this.christianLifeParts.next(christianLifeParts);
  }

  private updatePreachingPartsAfterEditing(editedPart: any, index: number) {
    const preachingParts = this.preachingParts.getValue();
    preachingParts[index] = editedPart;

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
    const bibleStudy = christianLifeParts.find((part: any) => part.title === 'Studiul Bibliei');

    // removes "Studiul Bibliei" from the array if it exists
    christianLifeParts = christianLifeParts.filter((part: any) => part.title !== 'Studiul Bibliei');
    // adds new part
    christianLifeParts.push(newSpeech);

    // Adds "Studiul Bibliei" back to the end of the array to keep it always last
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

  public resetToDefaultChristianLifeParts(): void {

    const defaultChristianLifeParts = [
      {
        title: 'Tema A',
        hours: 20,
        minutes: '0' + 5,
        seconds: 40,
        duration: 15
      },
      {
        title: 'Studiul Bibliei',
        hours: 20,
        minutes: 36,
        seconds: 20,
        duration: 30
      }
    ]

    localStorage.setItem('christianLife', JSON.stringify(defaultChristianLifeParts));
    this.christianLifeParts.next(defaultChristianLifeParts);
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
