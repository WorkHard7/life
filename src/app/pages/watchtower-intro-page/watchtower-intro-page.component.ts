import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";

@Component({
  selector: 'app-watchtower-intro-page',
  templateUrl: './watchtower-intro-page.component.html',
  styleUrls: ['./watchtower-intro-page.component.scss']
})
export class WatchtowerIntroPageComponent {
  protected readonly faArrowLeft = faArrowLeft;

  constructor(private router: Router) {
  }

  onSelectParagraph(paragraph: number) {
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
}
