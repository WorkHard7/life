import {Component, Input, OnInit} from '@angular/core';
import {faArrowLeft, faClock} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {selectHeader} from "../../../store/selectors/showHeader.selector";

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  @Input() watchtowerStarted: boolean = false;
  localTime: any = new Date();
  showHeader$!: Observable<boolean>;
  protected readonly faClock: any = faClock;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(private store: Store<AppState>) {
    this.showHeader$ = this.store.select(selectHeader);
  }

  ngOnInit(): void {
    this.updateLocalTime();
  }

  private updateLocalTime() {
    setInterval(() => {
      this.localTime = new Date();
    }, 1000)
  }
}
