import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { WindowComponent } from './components/window/window.component';
// Services
import { DataService } from './core/data.service';
import { FirestoreService } from './core/firestore.service';
import { ProjectService } from './core/project.service';
import { Subscription } from 'rxjs';
import { OsService } from './shared/services/os.service';
// interfaces
import {
  IAnimation,
  IIcons,
  IPortfolio,
  IOpenFile,
  IDesktopIcon,
  ISecondMenu,
} from './shared/interfaces';
import { wait } from './helpers/helper';
import { OpenFilesService } from './shared/services/open-files.service';
import animations from '../assets/animations.json';
import portfolioJson from '../assets/portfolio.json';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChildren(WindowComponent)
  private childrenFolder!: QueryList<WindowComponent>;

  // varibles
  screenHeight: number = 0;
  // subscriptions
  subscription: Subscription;
  openSubscription: Subscription;
  animationsSubscription: Subscription;
  // interfaces
  icons: IIcons[] = [];
  animations: IAnimation[] = [];
  openFiles: Array<IOpenFile> = [];
  portfolio: IPortfolio[] = [];
  macBgLottieOptions: { paused: boolean; style: string };
  bgLottieOptions: { paused: boolean; style: string };
  os: string;

  constructor(
    private firestoreService: FirestoreService,
    private projectService: ProjectService,
    private dataService: DataService,
    private responsive: BreakpointObserver,
    private osService: OsService,
    private openFilesService: OpenFilesService,
    analytics: AngularFireAnalytics
  ) {
    // ran when arrow in pic-view to change project in window
    this.subscription = this.projectService
      .getProject()
      .subscribe((project) => {
        if (project) {
          this.openFilesService.updateFile(
            project,
            this.animations,
            this.icons
          );
        }
      });

    // ran when file selected from folder
    this.openSubscription = this.projectService
      .openProject()
      .subscribe(async (project) => {
        if (project) {
          await wait(20);
          this.openFile(project);
        }
      });
  }

  ngOnInit() {
    const sorted = animations.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.animations = sorted.map((animation, index) => {
      return { ...animation, index, type: 'animation', viewer: 'pic' };
    });
    // used to get portfolio json
    this.portfolio = portfolioJson;
    // used to hide all other cards in html
    this.osService.subscribe((data) => {
      this.os = data;
    });

    this.openFilesService.subscribe((data) => {
      this.openFiles = [...data];
    });

    // fixes address bar on phones making 100vh not work correctly
    this.screenHeight = window.innerHeight;

    this.responsive.observe([Breakpoints.XSmall]).subscribe((result) => {
      this.macBgLottieOptions = {
        ...this.macBgLottieOptions,
        paused: result.matches,
      };
    });

    this.responsive.observe(Breakpoints.XLarge).subscribe((result) => {
      this.bgLottieOptions = {
        ...this.macBgLottieOptions,
        style: result.matches ? 'height: auto' : 'width: max-content ',
      };
    });
    // uses firestoreSevice to get icons
    this.firestoreService.getCollection('icons').subscribe((icons) => {
      const sorted = icons.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.icons = sorted.map((animation, index) => {
        return { ...animation, index, viewer: 'pic' };
      });
    });
  }

  // fixes address bar on phones making 100vh not work correctly
  onResize(event: Event) {
    const { innerHeight } = event.target as Window;
    this.screenHeight = innerHeight;
  }

  // emitted from taskbar to maximize window
  maximizeWindow(project: IOpenFile) {
    const newProjectIndex: number = this.openFiles.findIndex(
      (file) => file.uuid === project.uuid
    );
    if (newProjectIndex < 0) return;
    this.childrenFolder.toArray()[newProjectIndex].maximize();
    this.setLastClicked(project);
  }

  // push selected file to openFiles and add index for keeping track of file
  openFile(data: ISecondMenu) {
    this.openFilesService.addFile({ ...data, os: this.os });
  }

  // sets lastClicked for making last selected viewer on top
  setLastClicked(data: IOpenFile) {
    this.openFilesService.updateLast(data);
  }

  // removes file from openFiles when window closed
  windowClosed(project: IOpenFile) {
    this.openFilesService.removeFile(project);
  }

  // opens folder and passes in data
  openDesktopFolder(item: IDesktopIcon) {
    const alreadyOpen = this.openFiles.find((file) => file.name === item.name);
    if (alreadyOpen) {
      this.openFilesService.addFile({ ...alreadyOpen, os: this.os });
      return;
    }
    const items = (this as any)[item.name];
    this.openFilesService.addFile({ ...item, items, os: this.os });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
