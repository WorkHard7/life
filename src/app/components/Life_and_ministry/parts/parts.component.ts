import {Component, OnDestroy, OnInit} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {AllEvents} from "../../../model/events";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent extends SharedUtilsComponent implements OnInit, OnDestroy {
  gems!: any[];
  gemPartsSubscription!: Subscription;
  alternativePreachingParts: AllEvents = {
    index: 4,
    title: 'Să fim mai eficienți în predicare',
    hours: 19,
    minutes: 47,
    seconds: 0,
    duration: 15
  }

  constructor(
    private partsService: PartsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.gemPartsSubscription = this.partsService.gems.subscribe(gems => {
      this.gems = gems;
    });
  }

  ngOnDestroy() {
    this.gemPartsSubscription.unsubscribe();
  }

  setTime(gem: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', gem.index]);
  }
}
