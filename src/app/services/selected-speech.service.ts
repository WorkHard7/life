import {Injectable, signal, WritableSignal} from '@angular/core';
import {AllEvents} from "../model/events";

@Injectable({
  providedIn: 'root'
})
export class SelectedSpeechService {
  selectedSpeechSig: WritableSignal<AllEvents> = signal<AllEvents>(
    {
      index: 0,
      title: 'Turnul de veghe',
      hours: 20,
      minutes: 10,
      seconds: 0,
      duration: 60
    });

  updateSelectedSpeech(selectedSpeech: AllEvents) {
    selectedSpeech.duration = Number(selectedSpeech.duration);

    this.selectedSpeechSig.set(selectedSpeech);
  }
}
