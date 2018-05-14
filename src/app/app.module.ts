import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseConfig } from '../api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SoundcloudComponent } from './soundcloud/soundcloud.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Vis1Component } from './vis1/vis1.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { MobileComponent } from './mobile/mobile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SoundcloudComponent,
    WelcomeComponent,
    Vis1Component,
    HomeComponent,
    MobileComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
