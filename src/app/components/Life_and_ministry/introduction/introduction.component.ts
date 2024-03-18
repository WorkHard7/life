import {Component} from '@angular/core';
import {AllEvents} from "../../../model/events";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  isTimeRunning$!: Observable<boolean>;
  introPart: AllEvents = {
    index: 0,
    title: 'Cântare, rugăciune | Cuvinte introductive',
    hours: 19,
    minutes: 6,
    seconds: 0,
    duration: 6
  };

  constructor(private store: Store<AppState>) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
  }
}
