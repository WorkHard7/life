import {Injectable} from '@angular/core';
import {PREACHING, GEMS, CHRISTIAN_LIFE} from "../mock/mock-parts.service";
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {Events} from "../model/events";
import Swal from "sweetalert2";

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
      title: 'Adaugă o temă noua',
      html: `
        <input id="swal-input-title" class="swal2-input" placeholder="Titlu temă">
        <input id="swal-input-hours" class="swal2-input" placeholder="Ora finisarii" type="number" min="0">
        <input id="swal-input-minutes" class="swal2-input" placeholder="Minute" type="number" min="0" max="59">
      `,
      showCancelButton: true,
      confirmButtonText: 'Adaugă',
      cancelButtonText: 'Anulează',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = (document.getElementById('swal-input-title') as HTMLInputElement).value;
        const hours = (document.getElementById('swal-input-hours') as HTMLInputElement).value;
        const minutes = (document.getElementById('swal-input-minutes') as HTMLInputElement).value;

        if (!title || !hours || !minutes) {
          Swal.showValidationMessage('Completează toate câmpurile');
        }

        return {title: title, hours: Number(hours), minutes: Number(minutes)};
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const newSpeech = {
          title: result.value.title + ` (${result.value.hours}:${result.value.minutes})`!,
          hours: result.value.hours,
          minutes: result.value.minutes,
        };

        if (preaching) {
          this.updatePreachingParts(newSpeech);
        } else if (christianLife) {
          this.updateChristianLifeParts(newSpeech);
        } else {
          this.updateSpeeches(newSpeech);
        }

        Swal.fire({
          title: `Tema a fost adaugată cu succes!`,
          icon: 'success'
        })
      }
    })
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

  private updateChristianLifeParts(newSpeech: Events): void {
    const christianLifeParts = this.christianLifeParts.getValue();
    christianLifeParts.push(newSpeech);
    localStorage.setItem('christanLife', JSON.stringify(christianLifeParts));

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

        Swal.fire(
          'Resetat!',
          'Toate discursurile au fost resetate.',
          'success'
        )
      }
    });
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
