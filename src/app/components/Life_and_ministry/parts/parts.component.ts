import {Component, Input, OnInit} from '@angular/core';
import {ProcessParts} from "../../../model/process-parts";
import {CountdownService} from "../../../services/countdown.service";
import {faGem} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {EVENTS} from "../../../mock/events";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  @Input() parts!: ProcessParts;

  faGem: IconDefinition = faGem;
  redColor: boolean = false;

  constructor(private countdownService: CountdownService) {
  }

  ngOnInit(): void {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  setTime($event: HTMLElement): void {
    const text = $event.textContent;
    let endTime = new Date();

    const event = EVENTS.find((e: any) => text?.includes(e.name));

    if (event) {
      endTime.setHours(event.hours, event.minutes, 0);
      this.countdownService.startCountdown(endTime);
    }
  }
}
