import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";

@Component({
  selector: 'app-christian-life-parts',
  templateUrl: './christian-life-parts.component.html',
  styleUrls: ['./christian-life-parts.component.scss']
})
export class ChristianLifePartsComponent extends SharedUtilsComponent implements OnInit, OnDestroy {
  christianLifeParts!: any[];
  christianLifePartsSubscription!: Subscription;

  constructor(
    private partsService: PartsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.christianLifePartsSubscription = this.partsService.christianLifeParts.subscribe(parts => {
      this.christianLifeParts = parts;
    });
  }

  ngOnDestroy() {
    this.christianLifePartsSubscription.unsubscribe();
  }

  setTime(christianPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', christianPart.index]);
  }
}
