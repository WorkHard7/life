import {Component, Input, OnInit} from '@angular/core';
import {faArrowLeft, faClock} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {CountdownService} from "../../../services/countdown.service";
import {CountdownAllocatedTimeService} from "../../../services/countdown-allocated-time.service";
import {HeaderService} from "../../../services/header.service";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {map} from "rxjs";

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  @Input() watchtowerStarted: boolean = false;
  @Input() publicTalk: boolean = false;
  localTime: any = new Date();
  title: string = '';
  public readonly faClock: any = faClock;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private router: Router,
    private countdownService: CountdownService,
    private countdownAllocatedTimeService: CountdownAllocatedTimeService,
    public headerService: HeaderService,
    private selectedSpeechService: SelectedSpeechService
  ) {
  }

  ngOnInit(): void {
    this.updateLocalTime();
  }

  updateLocalTime() {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }

  goHome() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();

    this.router.navigate(['/']);
  }

  returnBack() {
    this.countdownService.stopCountdown();
    this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
    this.headerService.showHeaderAgain();

    if (this.watchtowerStarted) {
      this.router.navigate(['/watchtower']);
    } else if (this.publicTalk) {
      this.router.navigate(['/public_talk']);
    } else {
      this.router.navigate(['/life_and_ministry']);
    }
  }

  startNextSpeech() {
    this.selectedSpeechService.selectedSpeech$.pipe(
      map(selectedSpeech => this.title = selectedSpeech.title)
    ).subscribe(title => {
      if (title == 'Comori din Cuvântul lui Dumnezeu') {
        this.countdownAllocatedTimeService.stopCountdownForAllocatedTime();
        this.countdownService.stopCountdown();
      } else if (title == 'Nestemate spirituale') {
        console.log('Title is "Nestemate".');
      } else if (title == 'Citirea Bibliei') {
        console.log('Title is "Citirea Bibliei".');
      } else if (title == 'Să fim mai eficienți în predicare') {
        console.log('Title is "Să fim mai eficienți în predicare".');
      }
    })
  }
}
