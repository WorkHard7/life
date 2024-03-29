import {Injectable, signal, WritableSignal} from '@angular/core';
import {CHRISTIAN_LIFE, FINISH_PART, GEMS} from "../mock/mock-parts.service";
import {AllEvents} from "../model/events";
import Swal from "sweetalert2";
import {bibleStudy, speechA} from "../mock/speech";

function updateDuration(
  duration: number,
  partToBeEdited?: AllEvents
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
  let bStudySeconds: string = '30';
  let bStudyDuration: string = '';

  switch (duration) {
    case 0:
      bStudyHours = '20';
      bStudyMinutes = '36';
      bStudyDuration = '0';
      break;
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

  if (partToBeEdited && partToBeEdited.title != 'Studiul Bibliei') {
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
  public gemsSig: WritableSignal<any> = signal<any>([]);
  public christianLifePartsSig: WritableSignal<any> = signal<any>([]);
  public newIndexFinishPartSig: WritableSignal<number> = signal<number>(7);
  public finishPartSig: WritableSignal<AllEvents> = signal<AllEvents>(FINISH_PART);
  public bibleStudyDurationSig: WritableSignal<number> = signal<number>(3);

  constructor() {
    const gems = localStorage.getItem('gems');
    const christianLifeParts = localStorage.getItem('christianLife');
    const finishPart = localStorage.getItem('finishPart');

    this.getGemsFromStorage(gems);
    this.getChristianLifePartsFromStorage(christianLifeParts);
    this.getFinishPartFromLocalStorage(finishPart);
  }

  findAndEditChristianLifeParts(christianLifePartToBeEdited: any) {
    const parts = this.christianLifePartsSig();
    const partToBeEdited = parts.find((part: any) => part.title === christianLifePartToBeEdited.title);

    if (partToBeEdited !== -1) {
      const findIndex = parts.findIndex((part: any) => part === partToBeEdited);
      this.editPreachingAndChristianPart(partToBeEdited, findIndex);
    } else {
      console.log('christian life part was not found!')
    }
  }

  private editPreachingAndChristianPart(
    partToBeEdited: AllEvents,
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

    let bibleSButtonDurations = [
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

      speech = speechA;
    } else if (partToBeEdited.title === 'Studiul Bibliei') {
      title = 'Scurtarea Studiului Bibliei';

      bibleSButtonDurations = [
        {id: 'duration-button-0', duration: 0},
        {id: 'duration-button-2', duration: 2},
        {id: 'duration-button-3', duration: 3},
        {id: 'duration-button-5', duration: 5},
        {id: 'duration-button-7', duration: 7},
        {id: 'duration-button-10', duration: 10},
      ];

      speech = bibleStudy;
    }

    Swal.fire({
      title: title,
      html: speech,
      didOpen: () => {
        PartsService.selectsZeroButtonByDefault();
        this.assignGreenForSpeechASelection(buttonDurations, partToBeEdited);
        this.assignGreenForBSSelection(bibleSButtonDurations, partToBeEdited);

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
        });
      }
    })
  }

  private static selectsZeroButtonByDefault() {
    // by default 0 is selected
    const button0 = document.getElementById('duration-button-0');
    const button15 = document.getElementById('duration-button-15');

    if (button0) {
      button0.classList.add('bs-selected');
    } else {
      button15?.classList.add('selected');
    }

    // input field will have also 0 by default
    const BStudyDurationInput = document.getElementById('swal-input-duration-s-bible') as HTMLInputElement;
    if (BStudyDurationInput) {
      BStudyDurationInput.value = '0';
    }
  }

  private assignGreenForSpeechASelection(
    buttonDurations: { id: string, duration: number }[],
    partToBeEdited: AllEvents
  ) {
    buttonDurations.forEach(button => {
      const durationButtonElement = document.getElementById(button.id);

      if (durationButtonElement) {
        durationButtonElement.addEventListener('click', () => {

          buttonDurations.forEach(btn => {
            const btnElement = document.getElementById(btn.id);

            if (btnElement) {
              btnElement.classList.remove('selected');
            }
          });

          durationButtonElement.classList.add('selected');
          updateDuration(button.duration, partToBeEdited);
        })
      }
    });
  }

  private assignGreenForBSSelection(
    bibleSButtonDurations: { duration: number; id: string }[],
    partToBeEdited: AllEvents
  ) {
    bibleSButtonDurations.forEach(button => {
      const bibleSDurationsButtonsElement = document.getElementById(button.id);

      if (bibleSDurationsButtonsElement) {
        bibleSDurationsButtonsElement.addEventListener('click', () => {

          bibleSButtonDurations.forEach(btn => {
            const btnElement = document.getElementById(btn.id);

            if (btnElement) {
              btnElement.classList.remove('bs-selected');
            }
          });

          bibleSDurationsButtonsElement.classList.add('bs-selected');
          updateDuration(button.duration, partToBeEdited);
        })
      }
    });
  }

  private updatedSpeechA(result: any, index: number) {
    const editedSpeechA = {
      index: 5,
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
    if (this.christianLifePartsSig().length < 3 && result.value.speechBHours?.length > 1) {
      const newBSpeech = {
        index: 6,
        title: result.value.speechBTitle,
        hours: result.value.speechBHours,
        minutes: result.value.speechBMinutes,
        seconds: 0,
        duration: result.value.speechBDuration
      }

      this.updateBSIndex(7);
      this.updateFinishPartIndex(8);
      this.updateChristianLifePartsAfterAddingANewPart(newBSpeech);

      // Update the index of the finish part directly
      this.newIndexFinishPartSig.set(8);
    }
  }

  private editBibleStudyPart(partToBeEdited: AllEvents, result: any, index: number) {
    if (partToBeEdited.title == 'Studiul Bibliei') {
      const editedBStudy = {
        index: this.christianLifePartsSig().length > 2 ? 7 : 6, // if speechB present, change index to 7
        title: partToBeEdited.title,
        hours: result.value.speechBStudyHours,
        minutes: result.value.speechBStudyMinutes,
        seconds: result.value.speechBStudySeconds,
        duration: result.value.speechBStudyDuration
      };

      this.bibleStudyDurationSig.set(result.value.bibleStudyShortenedBy + 3);
      this.updateChristianLifePartsAfterEditing(editedBStudy, index);
    }
  }

  private validateInputs(partToBeEdited: AllEvents):
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
      bibleStudyShortenedBy?: number,
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
      const bibleStudyShortenedBy = (document.getElementById('swal-input-duration-s-bible') as HTMLInputElement)?.value;

      const sBibleDuration = 30 - Number(bibleStudyShortenedBy);

      if (!speechBStudyHours || !speechBStudyMinutes || !speechBStudySeconds || !bibleStudyShortenedBy) {
        return null;
      }

      return {
        speechBStudyHours: speechBStudyHours,
        speechBStudyMinutes: speechBStudyMinutes,
        speechBStudySeconds: speechBStudySeconds,
        bibleStudyShortenedBy: Number(bibleStudyShortenedBy),
        speechBStudyDuration: sBibleDuration
      };
    }
  }

  private updateChristianLifePartsAfterEditing(editedPart: any, index: number) {
    const christianLifeParts = this.christianLifePartsSig();
    christianLifeParts[index] = editedPart;

    localStorage.setItem('christianLife', JSON.stringify(christianLifeParts));
    this.christianLifePartsSig.set(christianLifeParts);
  }

  private updateChristianLifePartsAfterAddingANewPart(newSpeech: AllEvents): void {
    let christianLifeParts = this.christianLifePartsSig();
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
    this.christianLifePartsSig.set(christianLifeParts);
  }

  public resetToDefaultChristianLifeParts(speechAorBs?: string): void {
    let christianLifePartsFromStorage = JSON.parse(localStorage.getItem('christianLife') || '[]');

    if (speechAorBs === 'A') {
      if (christianLifePartsFromStorage.length === 3) {
        christianLifePartsFromStorage[0] = {
          index: 5,
          title: 'Tema A',
          hours: 20,
          minutes: '0' + 5,
          seconds: 40,
          duration: 15
        }

        // in case SpeechB was added, will remove it
        christianLifePartsFromStorage.splice(1, 1);
      } else if (christianLifePartsFromStorage.length > 0) {
        christianLifePartsFromStorage[0] = {
          index: 5,
          title: 'Tema A',
          hours: 20,
          minutes: '0' + 5,
          seconds: 40,
          duration: 15
        }
      }
    } else if (speechAorBs === 'BS') {
      christianLifePartsFromStorage[christianLifePartsFromStorage.length - 1] = {
        index: this.christianLifePartsSig().length > 2 ? 7 : 6, // if speechB present, change index to 7
        title: 'Studiul Bibliei',
        hours: 20,
        minutes: 36,
        seconds: 30,
        duration: 30
      }
      this.bibleStudyDurationSig.set(3);
    }

    localStorage.setItem('christianLife', JSON.stringify(christianLifePartsFromStorage));
    this.christianLifePartsSig.set(christianLifePartsFromStorage);

    this.updateBSIndex(this.christianLifePartsSig().length > 2 ? 7 : 6);
    this.updateFinishPartIndex(this.christianLifePartsSig().length > 2 ? 8 : 7);
  }

  private updateFinishPartIndex(newIndex: number) {
    this.finishPartSig.update(({
      title,
      hours,
      minutes,
      seconds,
      duration
    }) => ({
      index: newIndex,
      title,
      hours,
      minutes,
      seconds,
      duration
    }));

    localStorage.setItem('finishPart', JSON.stringify(this.finishPartSig()));
  }

  private updateBSIndex(newIndex: number) {
    let christianLifeParts = this.christianLifePartsSig();
    const bibleStudy = christianLifeParts.find((part: any) => part.title === 'Studiul Bibliei');
    bibleStudy.index = newIndex;

    localStorage.setItem('christianLife', JSON.stringify(christianLifeParts));
    this.christianLifePartsSig.set(christianLifeParts);
  }

  private getGemsFromStorage(gems: string | null): void {
    if (gems) {
      this.gemsSig.set(JSON.parse(gems));
    } else {
      this.gemsSig.set(GEMS);
      localStorage.setItem('gems', JSON.stringify(GEMS));
    }
  }

  private getChristianLifePartsFromStorage(christianLifeParts: string | null) {
    if (christianLifeParts) {
      this.christianLifePartsSig.set(JSON.parse(christianLifeParts));
    } else {
      this.christianLifePartsSig.set(CHRISTIAN_LIFE);
      localStorage.setItem('christianLife', JSON.stringify(CHRISTIAN_LIFE));
    }
  }

  private getFinishPartFromLocalStorage(finishPart: string | null) {
    if (finishPart) {
      this.finishPartSig.set(JSON.parse(finishPart));
    } else {
      this.finishPartSig.set(FINISH_PART);
      localStorage.setItem('finishPart', JSON.stringify(FINISH_PART));
    }
  }
}
