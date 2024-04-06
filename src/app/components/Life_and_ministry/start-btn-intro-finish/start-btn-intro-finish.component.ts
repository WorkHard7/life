import {Component, Input} from '@angular/core';
import {AllEvents} from "../../../model/events";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent extends SharedUtilsComponent {
  @Input() introPart?: AllEvents;
  @Input() finishPart?: AllEvents;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected startTimer() {
    this.fireLoadingAlert();
    this.navigateToRouteBasedOnParts();
  }

  private navigateToRouteBasedOnParts() {
    if (this.introPart) {
      this.router.navigate([this.introPart.index], {relativeTo: this.route});
    } else if (this.finishPart) {
      this.router.navigate([this.getFinishIndexFromStorage()], {relativeTo: this.route});
    }
  }

  private getFinishIndexFromStorage(): number | undefined {
    const finishPartFromStorage = JSON.parse(localStorage.getItem('finishPart') || '[]');

    if (finishPartFromStorage) {
      return finishPartFromStorage.index;
    } else return undefined;
  }
}
