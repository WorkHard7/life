import {Component, DestroyRef, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";
import {WatchtowerService} from "../../../services/watchtower.service";

@Component({
  selector: 'app-watchtower-paragraph',
  templateUrl: './watchtower-paragraph.component.html',
  styleUrls: ['./watchtower-paragraph.component.scss']
})
export class WatchtowerParagraphComponent implements OnInit {
  protected selectedParagraph!: number;
  protected currentParagraph!: number;
  protected isLoading: boolean = true;
  private intervalId!: any;
  protected isTimeRunning$!: Observable<boolean>;
  protected isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private destroyRef: DestroyRef,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    protected countdownService: CountdownService,
    private watchtowerService: WatchtowerService
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);

    // an alternative to ngOnDestroy
    this.destroyRef.onDestroy(() => {
      clearInterval(this.intervalId);
    })
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }

  ngOnInit(): void {
   this.route.paramMap
     .subscribe((paramMap: ParamMap) => {
      const selectedParagraph = paramMap.get('paragraph');
      if (selectedParagraph) {
        this.selectedParagraph = +selectedParagraph;
      }
    })

    this.updateWatchtower();
  }

  private updateWatchtower() {
    const customEndTime: any = this.watchtowerService.getWatchtowerCustomEndTime();
    const endTime: Date = new Date();

    endTime.setHours(customEndTime.hours, customEndTime.minutes, customEndTime.seconds);
    this.countdownService.startCountdown(endTime);

    if (this.isTimeRunning$) {
      this.calculateCurrentParagraph(endTime);
    }
  }

  private calculateCurrentParagraph(endTime: Date) {
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      const totalTime: number = 56; // 4 minutes for summary

      // remained minutes for orator when beginning the speech
      const remainingMinutes = (endTime.getTime() - currentTime.getTime()) / 60000;

      // what should be the paragraph duration based on number of paragraphs selected
      const paragraphDuration = totalTime / this.selectedParagraph;

      console.log('for each paragraph we have ', paragraphDuration, ' minutes');

      this.currentParagraph = Math.floor((totalTime - (remainingMinutes - 4)) / paragraphDuration) + 1;
      this.isLoading = false;
    }, 1000)
  }
}

