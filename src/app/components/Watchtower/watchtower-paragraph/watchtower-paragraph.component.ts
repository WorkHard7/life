import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-watchtower-paragraph',
  templateUrl: './watchtower-paragraph.component.html',
  styleUrls: ['./watchtower-paragraph.component.scss']
})
export class WatchtowerParagraphComponent implements OnInit, AfterViewInit {
  startTime: Date = new Date();
  endTime: Date = new Date();

  paragraph!: number;
  currentParagraph: number = 0;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public countdownService: CountdownService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const paragraph = param.get('paragraph');
      if (paragraph) {
        this.paragraph = +paragraph;
      }
    })
  }

  ngAfterViewInit(): void {
    this.startTime.setHours(9,58,0);
    this.endTime.setHours(10, 58, 0);
    setTimeout(() => {
      this.countdownService.startCountdown(this.endTime);
    });

    setInterval(() => {
      const currentTime = new Date();

      // remained time for orator when beginning the speech
      const remainingTime = (this.endTime.getTime() - currentTime.getTime()) / 60000;

      // what should be paragraph duration based on number of paragraphs selected
      const paragraphDuration = 60 / this.paragraph;

      this.currentParagraph = Math.floor((60 - remainingTime) / paragraphDuration) + 1;
      this.isLoading = false;
    },1000)
  }
}
