import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent extends SharedUtilsComponent implements OnInit, OnDestroy {
  preachingParts!: any[];
  preachingPartsSubscription!: Subscription;

  constructor(
    private partsService: PartsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.preachingPartsSubscription = this.partsService.preachingParts.subscribe(preachingParts => {
      this.preachingParts = preachingParts;
    });
  }

  ngOnDestroy() {
    this.preachingPartsSubscription.unsubscribe()
  }

  setTime(preachingPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', preachingPart.index]);
  }
}
