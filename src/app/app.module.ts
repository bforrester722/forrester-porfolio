import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

// lottie
import '@lottiefiles/lottie-player';
// my components
import { AppLottieComponent } from './components/app-lottie/app-lottie.component';
import { DesktopIconComponent } from './components/desktop-icon/desktop-icon.component';
import { DocViewComponent } from './components/doc-view/doc-view.component';
import { FolderItemsComponent } from './components/folder-items/folder-items.component';
import { MacTaskbarComponent } from './components/mac-taskbar/mac-taskbar.component';
import { OsToggleComponent } from './components/os-toggle/os-toggle.component';
import { passiveSupport } from 'passive-events-support/src/utils';
import { PicViewComponent } from './components/pic-view/pic-view.component';
import { StartUpComponent } from './components/start-up/start-up.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { WindowComponent } from './components/window/window.component';
import { MacTaskbarIconComponent } from './components/mac-taskbar-icon/mac-taskbar-icon.component';

require('default-passive-events');
// my services
import { OsService } from './shared/services/os.service';

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
    OsToggleComponent,
    MacTaskbarIconComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule, // firestore
    AngularFireAnalyticsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    MatButtonToggleModule,
    MatIconModule,
    provideAnalytics(() => getAnalytics()),
  ],
  providers: [OsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
