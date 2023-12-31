import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {PartsService} from "../../../services/parts.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  gems!: any[];
  isPreachingOpen: boolean = false;
  isChristianLife: boolean = false;
  isOpen: boolean = false;
  redColor: boolean = false;

  constructor(
    private countdownService: CountdownService,
    private partsService: PartsService
  ) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })

    this.partsService.gems.subscribe(gems => {
      this.gems = gems;
    });
  }

  setTime(hours: number, minutes: number): void {
    this.fireLoadingAlert();

    const endTime = new Date();

    endTime.setHours(hours, minutes, 0, 0);
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

  openPreachingParts(isOpen: boolean) {
    this.isPreachingOpen = isOpen;
  }

  openChristianLifeParts(isOpen: boolean) {
    this.isChristianLife = isOpen;
  }

  openGems(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}
