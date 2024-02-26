import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  redColorText: boolean = false;
  finishPart: Events = {
    title: 'Cuvinte de încheiere, anunțuri',
    hours: 20,
    minutes: 42,
    seconds: 0,
    duration: 6
  };

  constructor(
    public countdownService: CountdownService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  updateSelectedSpeech(finishPart: Events) {
    this.selectedSpeechService.updateSelectedSpeech(finishPart);
  }
}
