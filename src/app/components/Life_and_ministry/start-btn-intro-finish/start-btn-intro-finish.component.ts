import {Component, Input} from '@angular/core';
import {AllEvents} from "../../../model/events";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {hideHeader} from "../../../store/actions/showHeader.actions";

@Component({
  selector: 'app-start-btn-intro-finish',
  templateUrl: './start-btn-intro-finish.component.html',
  styleUrls: ['./start-btn-intro-finish.component.scss']
})
export class StartBtnIntroFinishComponent extends SharedUtilsComponent {
  @Input() introPart?: AllEvents;
  @Input() finishPart?: AllEvents;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }

  protected startTimer() {
    this.fireLoadingAlert();
    this.navigateToRouteBasedOnParts();
  }

  private navigateToRouteBasedOnParts() {
    if (this.introPart) {
      this.router.navigate(['/life_and_ministry', this.introPart.index]);
    } else if (this.finishPart) {
      this.router.navigate(['/life_and_ministry', this.getFinishIndexFromStorage()]);
    }
  }

  private getFinishIndexFromStorage(): number | undefined {
    const finishPartFromStorage = JSON.parse(localStorage.getItem('finishPart') || '[]');

    if (finishPartFromStorage) {
      return finishPartFromStorage.index;
    } else return undefined;
  }

  protected hideHeader() {
    this.store.dispatch(hideHeader());
  }
}
