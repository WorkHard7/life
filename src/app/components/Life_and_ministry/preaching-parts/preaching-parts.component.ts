import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../utils/shared-utils/shared-utils.component";
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

  constructor(private router: Router) {
    super();
  }

  protected navigateToPreachingPart(preachingPart: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', preachingPart.index]);
  }
}
