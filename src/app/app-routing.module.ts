import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LifeAndMinistryComponent} from "./pages/life-and-ministry/life-and-ministry.component";
import {WatchtowerComponent} from "./pages/watchtower/watchtower.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {background: true}
  },
  {
    path: 'life_and_ministry',
    component: LifeAndMinistryComponent
  },
  {
    path: 'watchtower',
    component: WatchtowerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
