import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {IntroAndFinishPart} from "../../../model/events";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();

  redColorText: boolean = false;
  introPart: IntroAndFinishPart = {
    title: 'Cântare, rugăciune | Cuvinte introductive',
    duration: 5.30,
    endHours: 19,
    endMinutes: 5,
    endSeconds: 15
  };

  constructor(public countdownService: CountdownService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  emitIntro() {
    this.selectedSpeech.emit(this.introPart);
  }
}
