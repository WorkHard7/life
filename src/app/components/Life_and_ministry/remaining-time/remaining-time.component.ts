import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit, OnDestroy {
  @Input() introduction: boolean = false;
  @Input() finish: boolean = false;

  protected readonly faArrowLeft = faArrowLeft;
  redColorText: boolean = false;

  private selectedSpeechSubscription!: Subscription;

  constructor(
    public countdownService: CountdownService,
    public countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private router: Router,
    public selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    });
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/life_and_ministry']);
  }

  checkIfNegativeTime(): boolean {
    return this.countdownService.diffTime.sign.includes('-');
  }

  updateRemainingTimeIfNecessary(): boolean {
    this.selectedSpeechSubscription = this.selectedSpeechService.selectedSpeech$.subscribe(selectedSpeech => {
      if (selectedSpeech.title === 'Cuvinte de încheiere, anunțuri') {
        return;
      }

      if (this.countdownService.remainingTime > this.countdownAllocatedTimeService.remainingAllocatedTime) {
        this.countdownService.remainingTime = this.countdownAllocatedTimeService.remainingAllocatedTime + 1;
        console.log('countdownService remainingTime is bigger than countdownAllocatedTimeService');
      }
    })

    return true;
  }

  ngOnDestroy(): void {
    if (this.selectedSpeechSubscription) {
      this.selectedSpeechSubscription.unsubscribe();
    }
  }
}
