import {Component} from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: 'app-shared-utils',
  templateUrl: './shared-utils.component.html',
  styleUrls: ['./shared-utils.component.scss']
})

export class SharedUtilsComponent {

  protected fireLoadingAlert() {
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading()

        setTimeout(() => {
          Swal.close();
        }, 1000);
      }
    });
  }
}
