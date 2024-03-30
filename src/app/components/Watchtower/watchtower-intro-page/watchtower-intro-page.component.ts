import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {SelectedSpeechService} from "../../../services/selected-speech.service";
import {WatchtowerService} from "../../../services/watchtower.service";

@Component({
  selector: 'app-watchtower-intro-page',
  templateUrl: './watchtower-intro-page.component.html',
  styleUrls: ['./watchtower-intro-page.component.scss']
})
export class WatchtowerIntroPageComponent implements OnInit {
  protected readonly faArrowLeft = faArrowLeft;
  private doubleClickTimeout: any;
  protected showPopup: boolean = false;
  protected selectedParagraph!: number;
  protected possibleParagraphNumbers: number[] = [16, 17, 18, 19, 20, 21, 22];

  constructor(
    private router: Router,
    private selectedSpeechService: SelectedSpeechService,
    private watchtowerService: WatchtowerService
  ) {
  }

  ngOnInit(): void {
    this.selectedParagraph = this.watchtowerService.getSelectedParagraph();
  }

  protected startW(paragraph: number) {
    this.selectedSpeechService.updateSelectedSpeech(this.watchtowerService.watchtowerCustomEndTime);

    this.router.navigateByUrl(`/watchtower/${paragraph}`).catch((err) => {
      Swal.fire({
        title: 'Error',
        text: `Navigation failed: ${err}`,
        icon: 'error'
      })
    });
  }

  protected onDoubleClick() {
    clearTimeout(this.doubleClickTimeout); // Clear any existing timeout
    this.doubleClickTimeout = setTimeout(() => {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2500); // Set your desired duration (in milliseconds) for showing the popup
    }, 500); // Set your desired duration (in milliseconds) for holding after double click
  }

  protected onMouseUp() {
    clearTimeout(this.doubleClickTimeout);
  }

  protected selectParagraph(paragraph: number) {
    this.watchtowerService.setSelectedParagraphToLocalStorage(paragraph);
    this.selectedParagraph = paragraph;
  }
}
