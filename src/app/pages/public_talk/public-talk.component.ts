import {Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Observable} from "rxjs";
import {selectIsTimeRunning} from "../../store/selectors/isTimeRunning.selector";

@Component({
  selector: 'app-public-talk',
  templateUrl: './public-talk.component.html',
  styleUrls: ['./public-talk.component.scss']
})
export class PublicTalkComponent {
  protected isTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private countdownService: CountdownService
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }
}
