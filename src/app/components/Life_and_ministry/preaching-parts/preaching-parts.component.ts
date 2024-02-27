import {Component, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {Events} from "../../../model/events";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent implements OnInit {
  preachingParts!: any[];

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.partsService.preachingParts.subscribe(preachingParts => {
      this.preachingParts = preachingParts;
    });

    console.log(this.preachingParts)
  }

  deleteSpeech(title: string): void {
    this.partsService.findAndDeleteSpeech(title, true);
  }

  setTime(preachingPart: any): void {
    this.fireLoadingAlert();
    this.updateSelectedSpeech(preachingPart);

    const endTime = new Date();
    endTime.setHours(preachingPart['hours'], preachingPart['minutes'], 0, 0);

    const endTimePreaching = new Date();
    endTime.setHours(preachingPart['hours'], preachingPart['minutes'], 0, 0);

    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endTimePreaching);
    this.countdownService.startCountdown(endTime);
  }

  private fireLoadingAlert() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()

        setTimeout(() => {
          Swal.close();
        }, 1000);
      }
    });
  }

  updateSelectedSpeech(selectedSpeech: Events) {
    this.selectedSpeechService.updateSelectedSpeech(selectedSpeech);
  }
}
