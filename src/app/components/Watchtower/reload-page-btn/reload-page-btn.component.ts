import {Component} from '@angular/core';
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons/faArrowsRotate";
import {CountdownService} from "../../../services/countdown.service";

@Component({
  selector: 'app-reload-page-btn',
  templateUrl: './reload-page-btn.component.html',
  styleUrls: ['./reload-page-btn.component.scss']
})
export class ReloadPageBtnComponent {
  public readonly faReload = faArrowsRotate;

  constructor(public countdownService: CountdownService) {
  }

  reloadPage() {
    window.location.reload();
  }
}
