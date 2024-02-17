import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  @Output() introTitleEmitted: EventEmitter<string> = new EventEmitter<string>();

  redColorText: boolean = false;
  introTitle = 'Cântare, rugăciune | Cuvinte introductive';

  finishIntroTime: any = {
    hour: 19,
    minutes: 5,
    seconds: 30
  };

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  emitIntroTitle() {
    this.introTitleEmitted.emit(this.introTitle);
  }
}
