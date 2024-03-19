import {Component, OnInit, WritableSignal} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";

@Component({
  selector: 'app-christian-life-parts',
  templateUrl: './christian-life-parts.component.html',
  styleUrls: ['./christian-life-parts.component.scss']
})
export class ChristianLifePartsComponent extends SharedUtilsComponent implements OnInit {
  protected christianLifePartsSig!: WritableSignal<any>;

  constructor(
    private partsService: PartsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.christianLifePartsSig = this.partsService.christianLifePartsSig;
  }

  protected navigateToChristianPart(christianPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', christianPart.index]);
  }
}
