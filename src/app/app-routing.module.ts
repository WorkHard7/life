import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LifeAndMinistryComponent} from './pages/life-and-ministry/life-and-ministry.component';
import {HomeComponent} from './pages/home/home.component';
import {
  WatchtowerParagraphComponent
} from './components/Watchtower/watchtower-paragraph/watchtower-paragraph.component';
import {PageNotFoundComponent} from './components/Page-not-found/page-not-found.component';
import {PublicTalkComponent} from './pages/public_talk/public-talk.component';
import {WatchtowerComponent} from './pages/watchtower/watchtower.component';
import {WatchtowerIntroPageComponent} from "./components/Watchtower/watchtower-intro-page.component";
import {PartsComponent} from "./components/Life_and_ministry/parts.component";
import {
  RemainingTimeRouteComponent
} from "./components/Life_and_ministry/remaining-time-route/remaining-time-route.component";
import {StartPublicTalkComponent} from "./components/Public_talk/start-public-talk/start-public-talk.component";
import {PublicTalkWrapperComponent} from "./components/Public_talk/public-talk-wrapper/public-talk-wrapper.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'life_and_ministry',
    component: LifeAndMinistryComponent,
    children: [
      {
        path: '',
        component: PartsComponent
      },
      {
        path: ':index',
        component: RemainingTimeRouteComponent
      }
    ]
  },
  {
    path: 'public_talk',
    component: PublicTalkComponent,
    children: [
      {
        path: '',
        component: StartPublicTalkComponent
      },
      {
        path: 'start',
        component: PublicTalkWrapperComponent
      },
    ]
  },
  {
    path: 'watchtower',
    component: WatchtowerComponent,
    children: [
      {
        path: '',
        component: WatchtowerIntroPageComponent
      },
      {
        path: ':paragraph',
        component: WatchtowerParagraphComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
