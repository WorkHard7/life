import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";
import {selectIsAllocatedTimeRunning} from "../../../store/selectors/isAllocatedTimeRunning.selector";

@Component({
  selector: 'app-watchtower-paragraph',
  templateUrl: './watchtower-paragraph.component.html',
  styleUrls: ['./watchtower-paragraph.component.scss']
})
export class WatchtowerParagraphComponent implements OnInit, OnDestroy {
  protected readonly faArrowLeft = faArrowLeft;
  routeParamSubscription!: Subscription;
  selectedParagraph!: number;
  currentParagraph!: number;
  isLoading: boolean = true;
  opacity: number = 1;
  intervalId!: any;
  isTimeRunning$!: Observable<boolean>;
  isAllocatedTimeRunning$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public countdownService: CountdownService
  ) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
    this.isAllocatedTimeRunning$ = this.store.select(selectIsAllocatedTimeRunning);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.paramMap.subscribe(param => {
      const selectedParagraph = param.get('paragraph');
      if (selectedParagraph) {
        this.selectedParagraph = +selectedParagraph;
      }
    })
  }

  ngAfterViewInit(): void {
    this.updateWatchtower();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    this.routeParamSubscription.unsubscribe();
  }

  updateWatchtower() {
    const customEndTime: any = this.countdownService.getWatchtowerCustomEndTime();
    const endTime: Date = new Date();

    endTime.setHours(customEndTime.hours, customEndTime.minutes, customEndTime.seconds);
    this.countdownService.startCountdown(endTime);

    this.isTimeRunning$.subscribe(isTimeRunning => {
      if (isTimeRunning) {
        this.calculateCurrentParagraph(endTime);
      }
    })
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

