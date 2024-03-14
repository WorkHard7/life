import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/Life_and_ministry/header/header.component';
import {PartsComponent} from './components/Life_and_ministry/parts/parts.component';
import {CurrentTimeComponent} from './components/Life_and_ministry/current-time/current-time.component';
import {RemainingTimeComponent} from './components/Life_and_ministry/remaining-time/remaining-time.component';
import {BackBtnComponent} from './components/Life_and_ministry/back-btn/back-btn.component';
import {StartBtnComponent} from './components/Life_and_ministry/start-btn/start-btn.component';
import {HomeComponent} from './pages/home/home.component';
import {LifeAndMinistryComponent} from './pages/life-and-ministry/life-and-ministry.component';
import {WatchtowerIntroPageComponent} from './components/Watchtower/watchtower-intro-page/watchtower-intro-page.component';
import {
  WatchtowerParagraphComponent
} from './components/Watchtower/watchtower-paragraph/watchtower-paragraph.component';
import {PageNotFoundComponent} from './components/Page-not-found/page-not-found.component';
import {AddCustomSpeechComponent} from "./components/Life_and_ministry/add-custom-speech/add-custom-speech.component";
import {ResetSpeechesComponent} from './components/Life_and_ministry/reset-speeches/reset-speeches.component';
import {PreachingPartsComponent} from './components/Life_and_ministry/preaching-parts/preaching-parts.component';
import {
  ChristianLifePartsComponent
} from './components/Life_and_ministry/christian-life-parts/christian-life-parts.component';
import {ReloadPageBtnComponent} from './components/Watchtower/reload-page-btn/reload-page-btn.component';
import {
  SetCustomTimeBtnWatchtowerComponent
} from './components/Watchtower/set-custom-time-btn-watchtower/set-custom-time-btn-watchtower.component';
import {DeleteBtnComponent} from './components/Life_and_ministry/delete-btn/delete-btn.component';
import {LeftControllersPublicTalk} from "./components/Public_talk/left-controllers_public_talk/left-controllers-public-talk";
import {PublicTalkComponent} from "./pages/public_talk/public-talk.component";
import {StartBtnPublicTalkComponent} from './components/Public_talk/start-btn-public-talk/start-btn-public-talk.component';
import {IntroductionComponent} from './components/Life_and_ministry/introduction/introduction.component';
import {FinishComponent} from './components/Life_and_ministry/finish/finish.component';
import {EditBtnComponent} from './components/Life_and_ministry/edit-btn/edit-btn.component';
import {WatchtowerComponent} from './pages/watchtower/watchtower.component';
import {RemainingTimeWatchtowerComponent} from './components/Watchtower/remaining-time-watchtower/remaining-time-watchtower.component';
import {StartBtnIntroFinishComponent} from './components/Life_and_ministry/start-btn-intro-finish/start-btn-intro-finish.component';
import {RemainingTimePublicTalkComponent} from './components/Public_talk/remaining-time-public-talk/remaining-time-public-talk.component';
import {LeftControllersComponent} from './components/Life_and_ministry/left-controllers/left-controllers.component';
import {StartBtnWatchtowerComponent} from './components/Watchtower/start-btn-watchtower/start-btn-watchtower.component';
import {LeftControllersWatchtowerComponent} from './components/Watchtower/left-controllers-watchtower/left-controllers-watchtower.component';
import {SharedUtilsComponent} from "./utils/shared-utils/shared-utils.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PartsComponent,
    CurrentTimeComponent,
    RemainingTimeComponent,
    BackBtnComponent,
    StartBtnComponent,
    HomeComponent,
    LifeAndMinistryComponent,
    WatchtowerIntroPageComponent,
    WatchtowerParagraphComponent,
    PageNotFoundComponent,
    AddCustomSpeechComponent,
    ResetSpeechesComponent,
    PreachingPartsComponent,
    ChristianLifePartsComponent,
    ReloadPageBtnComponent,
    SetCustomTimeBtnWatchtowerComponent,
    DeleteBtnComponent,
    PublicTalkComponent,
    StartBtnPublicTalkComponent,
    IntroductionComponent,
    FinishComponent,
    EditBtnComponent,
    WatchtowerComponent,
    RemainingTimeWatchtowerComponent,
    StartBtnIntroFinishComponent,
    RemainingTimePublicTalkComponent,
    LeftControllersComponent,
    LeftControllersPublicTalk,
    StartBtnWatchtowerComponent,
    LeftControllersWatchtowerComponent,
    SharedUtilsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
