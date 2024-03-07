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
  selectedParagraph!: number;
  currentParagraph!: number;
  isLoading: boolean = true;
  opacity: number = 1;

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
      const selectedParagraph = param.get('paragraph');
      if (selectedParagraph) {
        this.selectedParagraph = +selectedParagraph;
      }
    })
  }

  ngAfterViewInit(): void {
    this.updateWatchtower();
  }

  updateWatchtower() {
    const customEndTime: any = this.countdownService.getWatchtowerCustomEndTime();
    const endTime: Date = new Date();

    endTime.setHours(customEndTime.hours, customEndTime.minutes, customEndTime.seconds);
    this.countdownService.startCountdown(endTime);

    setInterval(() => {
      const currentTime = new Date();
      const totalTime: number = 56; // 4 minutes for summary

      // remained minutes for orator when beginning the speech
      const remainingMinutes = (endTime.getTime() - currentTime.getTime()) / 60000;

      // what should be the paragraph duration based on number of paragraphs selected
      const paragraphDuration = totalTime / this.selectedParagraph;

      console.log('for each paragraph we have ', paragraphDuration, ' minutes')

      this.currentParagraph = Math.floor((totalTime - (remainingMinutes - 4)) / paragraphDuration) + 1;
      this.isLoading = false;

      this.updateOpacity();
    }, 1000)
  }

  updateOpacity() {
    if (!this.isLoading && this.currentParagraph > this.selectedParagraph) {
      this.opacity = 0;
    } else {
      this.opacity = 1;
    }
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.router.navigate(['/watchtower']);
  }
}
