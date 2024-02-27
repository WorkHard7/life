import {Component, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-christian-life-parts',
  templateUrl: './christian-life-parts.component.html',
  styleUrls: ['./christian-life-parts.component.scss']
})
export class ChristianLifePartsComponent implements OnInit {
  christianLifeParts!: any[];

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.partsService.christianLifeParts.subscribe(parts => {
      this.christianLifeParts = parts;
    });
  }

  setTime(christianPart: any): void {
    this.fireLoadingAlert();
    this.updateSelectedSpeech(christianPart);

    const endTime = new Date();
    endTime.setHours(christianPart['hours'], christianPart['minutes'], 0, 0);

    const currentTime = new Date();
    const endAllocatedTime = new Date(currentTime.getTime() + christianPart['duration'] * 60000);

    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endAllocatedTime);
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

  private updateSelectedSpeech(selectedSpeech: Events) {
    this.selectedSpeechService.updateSelectedSpeech(selectedSpeech);
  }

  deleteSpeech(title: string): void {
    this.partsService.findAndDeleteSpeech(title, false, true);
  }
}
