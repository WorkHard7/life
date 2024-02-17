import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  @Output() finishTitleEmitted: EventEmitter<string> = new EventEmitter<string>();

  redColorText: boolean = false;
  finishTitle = 'Cuvinte de încheiere, anunțuri';

  finishTime: any = {
    hour: 20,
    minutes: 40,
    seconds: 0
  }

  constructor(public countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  emitFinishTitle() {
    this.finishTitleEmitted.emit(this.finishTitle);
  }
}
