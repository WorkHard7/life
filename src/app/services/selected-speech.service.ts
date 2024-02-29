import {Injectable} from '@angular/core';
import {Events} from "../model/events";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedSpeechService {
  selectedSpeechSubject: BehaviorSubject<Events> = new BehaviorSubject<Events>(
    {
      title: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      duration: 0
    });
  selectedSpeech$: Observable<Events> = this.selectedSpeechSubject.asObservable();

  updateSelectedSpeech(selectedSpeech: Events) {
    selectedSpeech.duration = Number(selectedSpeech.duration.toFixed());

    this.selectedSpeechSubject.next(selectedSpeech);
  }
}
