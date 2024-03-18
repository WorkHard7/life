import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {hideHeader} from "../../../store/actions/showHeader.actions";
import {Observable} from "rxjs";
import {selectIsTimeRunning} from "../../../store/selectors/isTimeRunning.selector";

@Component({
  selector: 'app-start-btn',
  templateUrl: './start-btn.component.html',
  styleUrls: ['./start-btn.component.scss']
})
export class StartBtnComponent {
  @Input() padding?: string;
  @Input() title?: string;
  isTimeRunning$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isTimeRunning$ = this.store.select(selectIsTimeRunning);
  }

  hideHeader() {
    this.store.dispatch(hideHeader());
  }
}
