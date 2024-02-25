import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  redColorText: boolean = false;
  introPart: Events = {
    title: 'Cântare, rugăciune | Cuvinte introductive',
    hours: 19,
    minutes: 5,
    seconds: 15,
    duration: 5.30
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

  updateSelectedSpeech(introPart: Events) {
    this.selectedSpeechService.updateSelectedSpeech(introPart);

  }
}
