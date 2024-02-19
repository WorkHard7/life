import {Component, Input} from '@angular/core';
import {PartsService} from "../../../services/parts.service";

@Component({
  selector: 'app-edit-btn',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent {
  @Input() preachingPartToBeEdited!: any;
  @Input() christianLifePartToBeEdited!: any;

  constructor(private partsService: PartsService) {
  }

  onBtnClick() {
    if (this.preachingPartToBeEdited !== undefined) {
      this.partsService.findAndEditPreachingParts(this.preachingPartToBeEdited);
    } else if (this.christianLifePartToBeEdited !== undefined) {
      this.partsService.findAndEditChristianLifeParts(this.christianLifePartToBeEdited);
    }
  }
}
