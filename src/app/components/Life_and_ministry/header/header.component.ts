import {Component, Input, OnInit} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {AllEvents} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {Observable} from "rxjs";
import {selectHeader} from "../../../store/selectors/showHeader.selector";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('title') header?: string;
  protected readonly faArrowLeft = faArrowLeft;
  public finalPartTitle: string = 'Cântare, rugăciune de încheiere';
  selectedSpeech$!: Observable<AllEvents>;
  showHeader$!: Observable<boolean>;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private selectedSpeechService: SelectedSpeechService
  ) {
    this.showHeader$ = this.store.select(selectHeader);
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  ngOnInit(): void {
    this.selectedSpeech$ = this.selectedSpeechService.selectedSpeech$;
  }

  goHome() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/']);
  }
}
