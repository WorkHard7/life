import {Component, Input} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {PartsService} from "../../../services/parts.service";

@Component({
  selector: 'app-add-custom-speech',
  templateUrl: './add-custom-speech.component.html',
  styleUrls: ['./add-custom-speech.component.scss']
})
export class AddCustomSpeechComponent {
  @Input() preaching: boolean = false;
  @Input() christianLife: boolean = false;
  protected readonly faPlus = faPlus;

  constructor(private partsService: PartsService) {
  }

  addCustomPart(): void {
    if (this.preaching) {
      this.partsService.addCustomSpeech(this.preaching);
      return;
    }

    if (this.christianLife) {
      this.partsService.addCustomSpeech(this.preaching, this.christianLife);
      return;
    }

    this.partsService.addCustomSpeech();
  }
}
