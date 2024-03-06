import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {PartsService} from "../../../services/parts.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  bibleStudyDuration: number = 3;
  finishPart: Events = {
    title: 'Cuvinte de încheiere, anunțuri',
    hours: 20,
    minutes: 40,
    seconds: 0,
    duration: 3
  };

  constructor(
    public countdownService: CountdownService,
    private selectedSpeechService: SelectedSpeechService,
    private partsService: PartsService
  ) {
  }

  ngOnInit(): void {
    this.partsService.bibleStudyDuration.subscribe(duration => {
      this.bibleStudyDuration = duration;
    })
  }

  updateSelectedSpeech(finishPart: Events) {
    this.selectedSpeechService.updateSelectedSpeech(finishPart);
  }
}
