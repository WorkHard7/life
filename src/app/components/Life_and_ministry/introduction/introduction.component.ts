import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  introPart: Events = {
    title: 'Cântare, rugăciune | Cuvinte introductive',
    hours: 19,
    minutes: 6,
    seconds: 0,
    duration: 6
  };

  constructor(
    public countdownService: CountdownService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  updateSelectedSpeech(introPart: Events) {
    this.selectedSpeechService.updateSelectedSpeech(introPart);
  }
}
