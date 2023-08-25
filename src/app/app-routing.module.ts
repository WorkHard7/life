import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LifeAndMinistryComponent} from "./pages/life-and-ministry/life-and-ministry.component";
import {HomeComponent} from "./pages/home/home.component";
import {WatchtowerIntroPageComponent} from "./pages/watchtower-intro-page/watchtower-intro-page.component";
import {WatchtowerParagraphComponent} from "./components/Watchtower/watchtower-paragraph/watchtower-paragraph.component";
import {PageNotFoundComponent} from "./components/Page-not-found/page-not-found.component";

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
    component: WatchtowerIntroPageComponent
  },
  {
    path: 'watchtower/:paragraph',
    component: WatchtowerParagraphComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
