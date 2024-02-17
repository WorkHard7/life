import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  @Output() selectedSpeech: EventEmitter<string> = new EventEmitter<string>();
  gems!: any[];
  redColorText: boolean = false;
  preachingParts!: any[];
  christianLifeParts!: any[];

  constructor(
    private countdownService: CountdownService,
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
    this.speechSelected(gem['title']);

    const endTime = new Date();

    endTime.setHours(gem['hours'], gem['minutes'], 0, 0);
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
