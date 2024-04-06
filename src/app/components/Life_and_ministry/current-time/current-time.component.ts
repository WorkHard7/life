import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faClock} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  localTime: any = new Date();
  protected readonly faClock: any = faClock;
  protected readonly faArrowLeft = faArrowLeft;

  ngOnInit(): void {
    this.updateLocalTime();
  }

  private updateLocalTime() {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }
}
