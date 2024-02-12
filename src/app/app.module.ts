import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/Life_and_ministry/header/header.component';
import {PartsComponent} from './components/Life_and_ministry/parts/parts.component';
import {CurrentTimeComponent} from './components/Life_and_ministry/current-time/current-time.component';
import {RemainingTimeComponent} from './components/Life_and_ministry/remaining-time/remaining-time.component';
import {ResetTimeBtnComponent} from './components/Life_and_ministry/reset-btn/reset-time-btn.component';
import {StartBtnComponent} from './components/Life_and_ministry/start-btn/start-btn.component';
import {HomeComponent} from './pages/home/home.component';
import {LifeAndMinistryComponent} from './pages/life-and-ministry/life-and-ministry.component';
import {WatchtowerIntroPageComponent} from './pages/watchtower-intro-page/watchtower-intro-page.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  WatchtowerParagraphComponent
} from './components/Watchtower/watchtower-paragraph/watchtower-paragraph.component';
import {PageNotFoundComponent} from './components/Page-not-found/page-not-found.component';
import {AddCustomSpeechComponent} from "./components/Life_and_ministry/add-custom-speech/add-custom-speech.component";
import {ResetSpeechesComponent} from './components/Life_and_ministry/reset-speeches/reset-speeches.component';
import {
  OpenBtnComponent
} from "./components/Life_and_ministry/open-btn/open-btn.component";
import {PreachingPartsComponent} from './components/Life_and_ministry/preaching-parts/preaching-parts.component';
import {
  ChristianLifePartsComponent
} from './components/Life_and_ministry/christian-life-parts/christian-life-parts.component';
import {ReloadPageBtnComponent} from './components/Watchtower/reload-page-btn/reload-page-btn.component';
import {
  SetCustomTimeBtnWatchtowerComponent
} from './components/Watchtower/set-custom-time-btn-watchtower/set-custom-time-btn-watchtower.component';
import {DeleteBtnComponent} from './components/Life_and_ministry/delete-btn/delete-btn.component';
import {PublicTalkComponent} from "./pages/public_talk/public-talk.component";
import {StartBtnPublicTalkComponent} from './components/Public_talk/start-btn-public-talk/start-btn-public-talk.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PartsComponent,
    CurrentTimeComponent,
    RemainingTimeComponent,
    ResetTimeBtnComponent,
    StartBtnComponent,
    HomeComponent,
    LifeAndMinistryComponent,
    WatchtowerIntroPageComponent,
    WatchtowerParagraphComponent,
    PageNotFoundComponent,
    AddCustomSpeechComponent,
    ResetSpeechesComponent,
    OpenBtnComponent,
    PreachingPartsComponent,
    ChristianLifePartsComponent,
    ReloadPageBtnComponent,
    SetCustomTimeBtnWatchtowerComponent,
    DeleteBtnComponent,
    PublicTalkComponent,
    StartBtnPublicTalkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
