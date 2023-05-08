import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProcessParts} from "../../model/process-parts";
import {CountdownService} from "../../services/countdown.service";
import {PartsService} from "../../services/parts.service";

@Component({
  selector: 'app-life-and-ministry',
  templateUrl: './life-and-ministry.component.html',
  styleUrls: ['./life-and-ministry.component.scss']
})
export class LifeAndMinistryComponent implements OnInit, AfterViewInit {
  title = 'Viața creștină și predicarea';
  parts!: ProcessParts[];
  redColor: boolean = false;

  constructor(
    public countdownService: CountdownService,
    private partsService: PartsService
  ) {
  }

  ngAfterViewInit() {
    this.countdownService.redColor$.subscribe(redColor => {
      this.redColor = redColor;
    })
  }

  ngOnInit(): void {
    this.partsService.getParts().subscribe({
      next: parts => this.parts = parts,
      error: (err) => console.log(err)
    })
  }
}
