import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {IntroAndFinishPart} from "../../../model/events";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();

  redColorText: boolean = false;
  finishPart: IntroAndFinishPart = {
    title: 'Cuvinte de încheiere, anunțuri',
    duration: 6,
    endHours: 20,
    endMinutes: 42,
    endSeconds: 0
  };

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  emitFinish() {
    this.selectedSpeech.emit(this.finishPart);
  }
}
