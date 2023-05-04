import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ProcessParts} from "../../model/process-parts";
import {CountdownService} from "../../services/countdown.service";
import {faGem} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  @Input() parts!: ProcessParts;

  faGem = faGem;
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  onClick($event: HTMLElement): void {
    const text = $event.textContent;
    let endTime = new Date();

    switch (true) {
      case text?.includes('Comori'):
        endTime.setHours(14, 54, 0);
        this.countdownService.startCountdown(endTime);
        break;
      case text?.includes('Nestemate'):
        endTime.setHours(22, 47, 0);
        this.countdownService.startCountdown(endTime);
        break;
      case text?.includes('Viața de creștin:'):
        endTime.setHours(22, 49, 0);
        this.countdownService.startCountdown(endTime);
        break;
      case text?.includes('Studiul Bibliei'):
        endTime.setHours(22, 54, 0);
        this.countdownService.startCountdown(endTime);
    }
  }
}
