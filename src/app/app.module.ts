import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { MatIconModule } from '@angular/material/icon';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';

// lottie

import '@lottiefiles/lottie-player';
// my components
import { AppLottieComponent } from './components/app-lottie/app-lottie.component';
import { DocViewComponent } from './components/doc-view/doc-view.component';
import { DesktopIconComponent } from './components/desktop-icon/desktop-icon.component';
import { FolderItemsComponent } from './components/folder-items/folder-items.component';
import { PicViewComponent } from './components/pic-view/pic-view.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { WindowComponent } from './components/window/window.component';
import { passiveSupport } from 'passive-events-support/src/utils';
import { StartUpComponent } from './components/start-up/start-up.component';
import { MacTaskbarComponent } from './components/mac-taskbar/mac-taskbar.component';
passiveSupport({});

@NgModule({
  declarations: [
    AppComponent,
    AppLottieComponent,
    DesktopIconComponent,
    DocViewComponent,
    FolderItemsComponent,
    PicViewComponent,
    StartUpComponent,
    TaskbarComponent,
    WindowComponent,
    MacTaskbarComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,

    MatIconModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
