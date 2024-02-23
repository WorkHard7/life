import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";
import {IntroAndFinishPart} from "../../../model/events";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();
  preachingParts!: any[];

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
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
    this.speechSelected(
      {
        title: preachingPart['title'],
        duration: preachingPart['duration'],
        endHours: preachingPart['hours'],
        endMinutes: preachingPart['minutes'],
        endSeconds: 0
      }
    )

    const endTime = new Date();
    endTime.setHours(preachingPart['hours'], preachingPart['minutes'], 0, 0);

    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endTime);
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

  speechSelected(selectedSpeech: IntroAndFinishPart) {
    this.selectedSpeech.emit(selectedSpeech);
  }
}
