import {Component, Input} from '@angular/core';
import {PartsService} from "../../../services/parts.service";

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent {
  @Input({ required: true }) christianLifePartToBeEdited: any;

  constructor(private partsService: PartsService) {
  }

  onBtnClick() {
    if (this.christianLifePartToBeEdited !== undefined) {

      // reset speeches just on Set btn from SpeechA
      if (this.christianLifePartToBeEdited.title != 'Studiul Bibliei') {
        this.partsService.resetToDefaultChristianLifeParts('A');
        this.partsService.newIndexFinishPartSig.set(7);
      } else {
        this.partsService.resetToDefaultChristianLifeParts('BS');
      }

      this.partsService.findAndEditChristianLifeParts(this.christianLifePartToBeEdited);
    }
  }
}
