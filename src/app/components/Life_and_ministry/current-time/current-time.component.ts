import {Component, OnInit} from '@angular/core';
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  localTime: any = new Date();
  public readonly faClock: any = faClock;

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }
}
