import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<Events> = new EventEmitter<Events>();

  redColorText: boolean = false;
  finishPart: Events = {
    title: 'Cuvinte de încheiere, anunțuri',
    hours: 20,
    minutes: 42,
    seconds: 0,
    duration: 6
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
