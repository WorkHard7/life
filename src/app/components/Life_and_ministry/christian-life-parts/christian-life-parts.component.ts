import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {CountdownService} from "../../../services/countdown.service";
import Swal from "sweetalert2";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";

@Component({
  selector: 'app-christian-life-parts',
  templateUrl: './christian-life-parts.component.html',
  styleUrls: ['./christian-life-parts.component.scss']
})
export class ChristianLifePartsComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<string> = new EventEmitter<string>();
  christianLifeParts!: any[];

  constructor(
    private partsService: PartsService,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
  ) {
  }

  ngOnInit(): void {
    this.partsService.christianLifeParts.subscribe(parts => {
      this.christianLifeParts = parts;
    });
  }

  setTime(christianPart: any): void {
    this.fireLoadingAlert();
    this.emitTitleName(christianPart['title']);

    const currentTime = new Date();
    const endTime = new Date();
    const endAllocatedTime = new Date(currentTime.getTime() + christianPart['duration'] * 60000);

    endTime.setHours(christianPart['hours'], christianPart['minutes'], 0, 0);

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

  private emitTitleName(title: string) {
    this.selectedSpeech.emit(title);
  }

  deleteSpeech(title: string): void {
    this.partsService.findAndDeleteSpeech(title, false, true);
  }
}
