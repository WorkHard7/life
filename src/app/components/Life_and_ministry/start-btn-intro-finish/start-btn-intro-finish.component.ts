import {Component, Input} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {AllEvents} from "../../../model/events";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent extends SharedUtilsComponent {
  @Input() introPart?: AllEvents;
  @Input() finishPart?: AllEvents;

  constructor(
    private headerService: HeaderService,
    private router: Router
  ) {
    super();
  }

  startTimer() {
    this.fireLoadingAlert();
    this.navigateToRouteBasedOnParts();
  }

  navigateToRouteBasedOnParts() {
    if (this.introPart) {
      this.router.navigate(['/life_and_ministry', this.introPart.index]);
    } else if (this.finishPart) {
      this.router.navigate(['/life_and_ministry', this.getFinishIndexFromStorage()]);
    }
  }

  getFinishIndexFromStorage(): number | undefined {
    const finishPartFromStorage = JSON.parse(localStorage.getItem('finishPart') || '[]');

    if (finishPartFromStorage) {
      return finishPartFromStorage[0].index;
    } else return undefined;
  }

  hideHeader() {
    this.headerService.hideHeader();
  }
}
