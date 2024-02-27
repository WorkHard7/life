import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {Events} from "../../../model/events";
import {SelectedSpeechService} from "../../../services/selected-speech.service";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  gems!: any[];
  redColorText: boolean = false;
  preachingParts!: any[];
  christianLifeParts!: any[];
  alternativePreachingParts: Events = {
    title: 'Să fim mai eficienți în predicare',
    hours: 19,
    minutes: 47,
    seconds: 30,
    duration: 16.02
  }

  constructor(
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })

    this.partsService.preachingParts.subscribe(preachingParts => {
      this.preachingParts = preachingParts;
    });

    this.partsService.christianLifeParts.subscribe(parts => {
      this.christianLifeParts = parts;
    });

    this.partsService.gems.subscribe(gems => {
      this.gems = gems;
    });
  }

  setTime(gem: any): void {
    this.fireLoadingAlert();
    this.updateSelectedSpeech(gem);

    const endTime = new Date();
    endTime.setHours(gem['hours'], gem['minutes'], 0, 0);

    const currentTime = new Date();
    const endAllocatedTime = new Date(currentTime.getTime() + gem['duration'] * 60000);

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

  updateSelectedSpeech(selectedSpeech: Events) {
    this.selectedSpeechService.updateSelectedSpeech(selectedSpeech);
  }
}
