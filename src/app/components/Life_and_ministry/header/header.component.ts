import {Component, Input} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input('title') header?: string;

  constructor(private router: Router) {
  }

  protected readonly faArrowLeft = faArrowLeft;

  goHome() {
    this.router.navigate(['']);
  }
}
