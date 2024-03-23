import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {ActivatedRoute, Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {AllEvents} from "../../../model/events";
import {AllPartsService} from "../../../mock/all-parts.service";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";
import {Subscription} from "rxjs";
import {AppState} from "../../../store/app.state";
import {showHeader} from "../../../store/actions/showHeader.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-left-controllers',
  templateUrl: './left-controllers.component.html',
  styleUrls: ['./left-controllers.component.scss']
})
export class LeftControllersComponent extends SharedUtilsComponent implements OnInit, OnDestroy {
  protected readonly faArrowLeft = faArrowLeft;
  routeParamSubscription!: Subscription;
  index: number = 0;

  constructor(
    private store: Store<AppState>,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private router: Router,
    private route: ActivatedRoute,
    private selectedSpeechService: SelectedSpeechService,
    private allPartsService: AllPartsService
  ) {
    super();
  }

  ngOnInit() {
    this.routeParamSubscription = this.route.paramMap.subscribe(params => {
      this.index = Number(params.get('index'));

      this.startTimerForSpeech(this.index);
    })
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

  protected startNextSpeech() {
    this.fireLoadingAlert();
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/life_and_ministry', ++this.index]);
  }

  private startTimerForSpeech(index: number) {
    let speech: AllEvents | undefined;

    const lifePartsFromStorage = JSON.parse(localStorage.getItem('christianLife') || '[]');
    speech = this.allPartsService.allSpeeches.find((speech: any) => speech.index === index);

    // the check will start just from speechB or Studiul Bibilei when speechB is absent
    switch (index) {
      case 5:
        speech = this.getDetailsForLifePartFromStorage(index, 0);
        break;
      case 6:
        speech = this.getDetailsForLifePartFromStorage(index, 1);
        break;
      case 7:
        speech = this.getDetailsForLifePartFromStorage(index, 2);
        break;
      case 8:
        speech = this.getDetailsForLifePartFromStorage(index, 0);
        break;
    }

    console.log('speech', speech);

    if (speech) {
      this.updateSelectedSpeech(speech);

      const endTime = new Date();
      endTime.setHours(speech.hours, speech.minutes, speech.seconds, 0);

      if (this.checkTheLifeLengthAndIndex(lifePartsFromStorage)) {
        this.countdownService.startCountdown(endTime);
        return;
      }

      const currentTime = new Date();
      const endAllocatedTime = new Date(currentTime.getTime() + speech.duration * 60000);

      this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endAllocatedTime);
      this.countdownService.startCountdown(endTime);
    }
  }

  private getDetailsForLifePartFromStorage(index: number, position: number): AllEvents | undefined {
    try {
      const lifePartsFromStorage = JSON.parse(localStorage.getItem('christianLife') || '[]');

      if (this.checkTheLifeLengthAndIndex(lifePartsFromStorage)) {
        return JSON.parse(localStorage.getItem('finishPart') || '[]');
      } else if (lifePartsFromStorage.length === 3 && index === 7) {
        return lifePartsFromStorage[position];
      } else if (lifePartsFromStorage.length > 0) {
        return lifePartsFromStorage[position];
      } else {
        return undefined;
      }
    } catch (err) {
      console.error('Error parsing data from localStorage:', err);
      return undefined;
    }
  }

  private checkTheLifeLengthAndIndex(lifePartsFromStorage: any): boolean {
    return (lifePartsFromStorage.length === 2 && this.index === 7) ||
      (lifePartsFromStorage.length === 3 && this.index === 8);
  }

  private updateSelectedSpeech(selectedSpeech: AllEvents) {
    this.selectedSpeechService.updateSelectedSpeech(selectedSpeech);
  }

  protected returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
    this.store.dispatch(showHeader());

    this.router.navigate(['/life_and_ministry']);
  }

  protected hideNextSpeechButton(): boolean {
    const lifePartsFromStorage = JSON.parse(localStorage.getItem('christianLife') || '[]');

    return this.checkTheLifeLengthAndIndex(lifePartsFromStorage);
  }
}
