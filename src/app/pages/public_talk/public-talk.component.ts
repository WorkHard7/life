import {Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";
import {Router} from "@angular/router";
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
    public countdownService: CountdownService,
    private router: Router
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }
}
