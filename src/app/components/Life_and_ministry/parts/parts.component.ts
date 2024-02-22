import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {IntroAndFinishPart} from "../../../model/events";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<IntroAndFinishPart> = new EventEmitter<IntroAndFinishPart>();
  gems!: any[];
  redColorText: boolean = false;
  preachingParts!: any[];
  christianLifeParts!: any[];

  constructor(
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    private partsService: PartsService
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
    this.emitSpeechSelected(
      {
        title: gem['title'],
        duration: gem['duration'],
        endHours: gem['hours'],
        endMinutes: gem['minutes'],
        endSeconds: 0
      });

    const currentTime = new Date();
    const endTime = new Date();
    const endAllocatedTime = new Date(currentTime.getTime() + gem['duration'] * 60000);

    endTime.setHours(gem['hours'], gem['minutes'], 0, 0);

    this.countdownService.startCountdown(endTime);
    this.countdownAllocatedTimeService.startCountdownForAllocatedTime(endAllocatedTime);
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

  emitSpeechSelected(selectedSpeech: IntroAndFinishPart) {
    this.selectedSpeech.emit(selectedSpeech);
  }
}
