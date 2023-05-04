import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PartsComponent } from './components/parts/parts.component';
import { CurrentTimeComponent } from './components/current-time/current-time.component';
import { RemainingTimeComponent } from './components/remaining-time/remaining-time.component';
import { ResetBtnComponent } from './components/reset-btn/reset-btn.component';
import { StartBtnComponent } from './components/start-btn/start-btn.component';
import { ResetBtnPrematureComponent } from './components/reset-btn-premature/reset-btn-premature.component';
import { HomeComponent } from './pages/home/home.component';
import { LifeAndMinistryComponent } from './pages/life-and-ministry/life-and-ministry.component';
import { WatchtowerComponent } from './pages/watchtower/watchtower.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PartsComponent,
    CurrentTimeComponent,
    RemainingTimeComponent,
    ResetBtnComponent,
    StartBtnComponent,
    ResetBtnPrematureComponent,
    HomeComponent,
    LifeAndMinistryComponent,
    WatchtowerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
