import {Component, OnInit} from '@angular/core';
import {GEMS} from "../../mock/mock-parts.service";
import {CountdownService} from "../../services/countdown.service";
import {Events} from "../../model/events";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'ministry_app';
  parts!: Events[];
  redColorText: boolean = false;

  constructor(private countdownService: CountdownService) {
    this.countdownService.redColorText$.subscribe(redColorText => {
      this.redColorText = redColorText;
    })
  }

  ngOnInit(): void {
    this.parts = GEMS;
  }
}
