import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";
import {AllEvents} from "../../../model/events";

@Component({
  selector: 'app-preaching-parts',
  templateUrl: './preaching-parts.component.html',
  styleUrls: ['./preaching-parts.component.scss']
})
export class PreachingPartsComponent extends SharedUtilsComponent {
  preachingParts: AllEvents[] = [
    {
      index: 4,
      title: 'Să fim mai eficienți în predicare',
      hours: 19,
      minutes: 47,
      seconds: 0,
      duration: 15.40
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected navigateToPreachingPart(preachingPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate([preachingPart.index], {relativeTo: this.route});
  }
}
