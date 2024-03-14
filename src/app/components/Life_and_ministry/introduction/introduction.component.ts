import {Component} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {AllEvents} from "../../../model/events";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  introPart: AllEvents = {
    index: 0,
    title: 'Cântare, rugăciune | Cuvinte introductive',
    hours: 19,
    minutes: 6,
    seconds: 0,
    duration: 6
  };

  constructor(public countdownService: CountdownService) {
  }
}
