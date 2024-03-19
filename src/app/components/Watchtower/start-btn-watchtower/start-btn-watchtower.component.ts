import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-start-btn-watchtower',
  templateUrl: './start-btn-watchtower.component.html',
  styleUrls: ['./start-btn-watchtower.component.scss']
})
export class StartBtnWatchtowerComponent {
  @Input({ required: true }) selectedParagraph!: number;
}
