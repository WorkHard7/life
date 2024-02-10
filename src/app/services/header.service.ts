import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  showHeader = true;

  hideHeader() {
    this.showHeader = false;
  }

  showHeaderAgain() {
    this.showHeader = true;
  }
}
