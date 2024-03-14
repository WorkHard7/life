import {Component, Input, OnInit} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {HeaderService} from "../../../services/header.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {AllEvents} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {Observable} from "rxjs";

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

  constructor(
    private router: Router,
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    public headerService: HeaderService,
    private selectedSpeechService: SelectedSpeechService
  ) {
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
