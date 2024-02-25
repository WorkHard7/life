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
    this.extractTimingFromTitle(selectedSpeech);
  }

  private extractTimingFromTitle(selectedSpeech: Events): void {
    const timingStartIndex = selectedSpeech.title.indexOf("(") - 1;
    const titleStartIndex = 0;

    // in case the title does not contain "("
    if (timingStartIndex >= 0) {
      selectedSpeech.title = selectedSpeech.title.substring(titleStartIndex, timingStartIndex);
    }
    selectedSpeech.duration = Number(selectedSpeech.duration.toFixed());

    this.selectedSpeechSubject.next(selectedSpeech);
  }
}
