import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {CountdownService} from "../../../services/countdown.service";
import Swal from "sweetalert2";

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
    private countdownService: CountdownService
  ) {
  }

  ngOnInit(): void {
    this.partsService.christianLifeParts.subscribe(parts => {
      this.christianLifeParts = parts;
    });
  }

  setTime(part: any): void {
    this.fireLoadingAlert();
    this.emitTitleName(part['title']);

    const endTime = new Date();

    endTime.setHours(part['hours'], part['minutes'], 0, 0);
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

  private emitTitleName(title: string) {
    this.selectedSpeech.emit(title);
  }

  deleteSpeech(title: string): void {
    this.partsService.findAndDeleteSpeech(title, false, true);
  }
}
