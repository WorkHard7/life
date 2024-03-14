import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {AllEvents} from "../../../model/events";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {CountdownService} from "../../../services/countdown.service";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent extends SharedUtilsComponent implements OnInit, OnDestroy {
  preachingParts!: any[];
  preachingPartsSubscription!: Subscription;

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private selectedSpeechService: SelectedSpeechService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.preachingPartsSubscription = this.partsService.preachingParts.subscribe(preachingParts => {
      this.preachingParts = preachingParts;
    });
  }

  ngOnDestroy() {
    this.preachingPartsSubscription.unsubscribe()
  }

  deleteSpeech(title: string): void {
    this.partsService.findAndDeleteSpeech(title, true);
  }

  setTime(preachingPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', preachingPart.index]);
  }

  updateSelectedSpeech(selectedSpeech: AllEvents) {
    this.selectedSpeechService.updateSelectedSpeech(selectedSpeech);
  }
}
