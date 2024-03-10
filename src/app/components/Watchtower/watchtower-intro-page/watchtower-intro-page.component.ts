import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {faArrowLeft, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-watchtower-intro-page',
  templateUrl: './watchtower-intro-page.component.html',
  styleUrls: ['./watchtower-intro-page.component.scss']
})
export class WatchtowerIntroPageComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faRefresh = faRefresh;
  private doubleClickTimeout: any;
  public showPopup: boolean = false;
  public selectedParagraph!: number;

  constructor(
    private router: Router,
    private selectedSpeechService: SelectedSpeechService,
    private countdownService: CountdownService
  ) {
  }

  startW(paragraph: number) {
    this.selectedSpeechService.updateSelectedSpeech(this.countdownService.watchtowerCustomEndTime);

    this.router.navigateByUrl(`/watchtower/${paragraph}`).catch((err) => {
      Swal.fire({
        title: 'Error',
        text: `Navigation failed: ${err}`,
        icon: 'error'
      })
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  onDoubleClick() {
    clearTimeout(this.doubleClickTimeout); // Clear any existing timeout
    this.doubleClickTimeout = setTimeout(() => {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Set your desired duration (in milliseconds) for showing the popup
    }, 500); // Set your desired duration (in milliseconds) for holding after double click
  }

  onMouseUp() {
    clearTimeout(this.doubleClickTimeout);
  }

  selectParagraph(paragraph: number) {
    this.selectedParagraph = paragraph;
  }
}
