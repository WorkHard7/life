import {Component, Input} from '@angular/core';
import {faRepeat} from "@fortawesome/free-solid-svg-icons";
import {PartsService} from "../../../services/parts.service";

@Component({
  selector: 'app-reset-speeches',
  templateUrl: './reset-speeches.component.html',
  styleUrls: ['./reset-speeches.component.scss']
})
export class ResetSpeechesComponent {
  @Input() title: string = '';
  @Input() preaching: boolean = false;
  @Input() christianLife: boolean = false;
  protected readonly faRepeat = faRepeat;

  constructor(private partsService: PartsService) {
  }

  resetSpeeches() {
    if (this.preaching) {
      this.partsService.resetSpeeches(this.title, this.preaching);
      return;
    }

    if (this.christianLife) {
      this.partsService.resetSpeeches(this.title, this.preaching, this.christianLife);
      return;
    }

    this.partsService.resetSpeeches(this.title);
  }
}
