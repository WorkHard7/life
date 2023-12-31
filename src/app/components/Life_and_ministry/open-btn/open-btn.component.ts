import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-open-btn',
  templateUrl: './open-btn.component.html',
  styleUrls: ['./open-btn.component.scss']
})
export class OpenBtnComponent {
  @Input() preaching: boolean = false;
  @Input() christianLife: boolean = false;
  @Output() PreachingBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  isOpen: boolean = false;
  isPreachingOpen: boolean = false;

  protected readonly faAngleDown = faAngleDown;
  protected readonly faAngleUp = faAngleUp;

  openParts() {
    if (this.preaching) {
      this.isPreachingOpen = !this.isPreachingOpen;
      this.PreachingBtn.emit(this.isPreachingOpen);

      return;
    }

    if (this.christianLife) {
      this.christianLife = !this.christianLife;
      this.PreachingBtn.emit(this.christianLife);

      return;
    }

    this.isOpen = !this.isOpen;
    this.PreachingBtn.emit(this.isOpen);
  }
}
