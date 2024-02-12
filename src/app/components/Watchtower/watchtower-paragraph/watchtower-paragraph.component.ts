import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-watchtower-paragraph',
  templateUrl: './watchtower-paragraph.component.html',
  styleUrls: ['./watchtower-paragraph.component.scss']
})
export class WatchtowerParagraphComponent implements OnInit, AfterViewInit {
  protected readonly faArrowLeft = faArrowLeft;

  paragraph!: number;
  currentParagraph: number = 0;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public countdownService: CountdownService,
    private router: Router
  ) {
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.countdownService.stopCountdown();
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
    this.updateWatchtower();
  }

  updateWatchtower() {
    const customEndTime: any = this.countdownService.getCustomEndTime();
    const endTime: Date = new Date();

    endTime.setHours(customEndTime.hours, customEndTime.minutes, customEndTime.seconds);
    this.countdownService.startCountdown(endTime);

    setInterval(() => {
      const currentTime = new Date();

      // remained time for orator when beginning the speech
      const remainingTime = (endTime.getTime() - currentTime.getTime()) / 60000;

      // what should be paragraph duration based on number of paragraphs selected
      const paragraphDuration = 60 / this.paragraph;

      this.currentParagraph = Math.floor((60 - remainingTime) / paragraphDuration) + 1;
      this.isLoading = false;
    }, 1000)
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/watchtower']);
  }
}
