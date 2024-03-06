import {Component, OnInit} from '@angular/core';
import {GEMS} from "../../mock/mock-parts.service";
import {Events} from "../../model/events";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'ministry_app';
  parts!: Events[];

  constructor() {
  }

  ngOnInit(): void {
    this.parts = GEMS;
  }
}
