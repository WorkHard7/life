import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Events} from "../../../model/events";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<Events> = new EventEmitter<Events>();

  redColorText: boolean = false;
  introPart: Events = {
    title: 'Cântare, rugăciune | Cuvinte introductive',
    hours: 19,
    minutes: 5,
    seconds: 15,
    duration: 5.30
  };

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  emitIntro(introPart: Events) {
    this.selectedSpeech.emit(introPart);
  }
}
