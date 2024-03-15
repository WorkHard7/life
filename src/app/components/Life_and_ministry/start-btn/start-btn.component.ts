import {Component, Input} from '@angular/core';
import {CountdownService} from "../../../services/countdown.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {hideHeader} from "../../../store/actions/showHeader.actions";

@Component({
  selector: 'app-start-btn',
  templateUrl: './start-btn.component.html',
  styleUrls: ['./start-btn.component.scss']
})
export class StartBtnComponent {
  @Input() padding?: string;
  @Input() title?: string;

  constructor(
    private store: Store<AppState>,
    public countdownService: CountdownService
  ) {
  }

  hideHeader() {
    this.store.dispatch(hideHeader());
  }
}
