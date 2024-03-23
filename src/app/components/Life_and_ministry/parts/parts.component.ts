import {Component, OnInit, WritableSignal} from '@angular/core';
import {PartsService} from "../../../services/parts.service";
import {Router} from "@angular/router";
import {SharedUtilsComponent} from "../../../shared/components/utils/shared-utils.component";

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent extends SharedUtilsComponent implements OnInit {
  gemPartsSig!: WritableSignal<any>;

  constructor(
    private partsService: PartsService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.gemPartsSig = this.partsService.gemsSig;
  }

  protected navigateToGemsPart(gem: any): void {
    this.fireLoadingAlert();
    this.router.navigate(['/life_and_ministry', gem.index]);
  }
}
