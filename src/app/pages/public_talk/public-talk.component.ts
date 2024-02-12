import {AfterViewInit, Component, HostListener} from '@angular/core';
import {CountdownService} from "../../services/countdown.service";

@Component({
  selector: 'app-public-talk',
  templateUrl: './public-talk.component.html',
  styleUrls: ['./public-talk.component.scss']
})
export class PublicTalkComponent implements AfterViewInit {
  redColorText: boolean = false;

  constructor(public countdownService: CountdownService) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
  }

  ngAfterViewInit() {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }
}
