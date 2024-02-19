import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<string> = new EventEmitter<string>();
  preachingParts!: any[];

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
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
    this.speechSelected(preachingPart['title'])

    const endTime = new Date();
    endTime.setHours(preachingPart['hours'], preachingPart['minutes'], 0, 0);

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

  speechSelected(selectedSpeech: string) {
    this.selectedSpeech.emit(selectedSpeech);
  }
}
