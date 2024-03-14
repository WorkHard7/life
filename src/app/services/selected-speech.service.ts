import {Injectable} from '@angular/core';
import {AllEvents} from "../model/events";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedSpeechService {
  selectedSpeechSubject: BehaviorSubject<AllEvents> = new BehaviorSubject<AllEvents>(
    {
      index: 0,
      title: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      duration: 0
    });
  selectedSpeech$: Observable<AllEvents> = this.selectedSpeechSubject.asObservable();

  updateSelectedSpeech(selectedSpeech: AllEvents) {
    selectedSpeech.duration = Number(selectedSpeech.duration);

    this.selectedSpeechSubject.next(selectedSpeech);
  }
}
