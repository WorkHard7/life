import {Component} from '@angular/core';
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-reload-page-btn',
  templateUrl: './reload-page-btn.component.html',
  styleUrls: ['./reload-page-btn.component.scss']
})
export class ReloadPageBtnComponent {
  public readonly faReload = faArrowsRotate;

  constructor() {
  }

  reloadPage() {
    window.location.reload();
  }
}
