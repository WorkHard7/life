import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  localTime: any = new Date();

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }
}
