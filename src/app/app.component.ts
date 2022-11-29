import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { WindowComponent } from './components/window/window.component';
// Services
import { DataService } from './core/data.service';
import { FirestoreService } from './core/firestore.service';
import { ProjectService } from './core/project.service';
import { Subscription } from 'rxjs';
// interfaces
import { IAnimation, IIcons, IPortfolio, IOpenFile } from './shared/interfaces';
import { wait } from './helpers/helper';

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

  constructor(
    private firestoreService: FirestoreService,
    private projectService: ProjectService,
    private dataService: DataService
  ) {
    // ran when arrow in pic-view to change project in window
    this.subscription = this.projectService
      .getProject()
      .subscribe((project) => {
        if (project) {
          this.projectChanged(project);
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

    // gets animation data from animations.json, sorts by name, and adds index
    this.animationsSubscription = this.dataService
      .getAnimations()
      .subscribe((animations) => {
        if (animations) {
          const sorted = animations.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.animations = sorted.map((animation, index) => {
            return { ...animation, index };
          });
        }
      });
  }

  ngOnInit() {
    // fixes address bar on phones making 100vh not work correctly
    this.screenHeight = window.innerHeight;
    // uses firestoreSevice to get icons
    this.firestoreService.getCollection('icons').subscribe((icons) => {
      const sorted = icons.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.icons = sorted.map((animation, index) => {
        return { ...animation, index, viewer: 'pic' };
      });
    });
    // used to get portfolio json
    this.dataService.getPortfolio().subscribe((portfolio: any) => {
      this.portfolio = portfolio;
    });
  }

  // fixes address bar on phones making 100vh not work correctly
  onResize(event: any) {
    const { innerHeight } = event.target;
    this.screenHeight = innerHeight;
  }

  // ran when left or right clicked from pic-view
  projectChanged(project: any) {
    const { width, height, top, left } =
      this.childrenFolder.toArray()[project.openIndex];
    const { index, openIndex } = project;
    const type = project.src ? this.icons : this.animations;
    let newIndex = index + 1 > type.length ? 0 : index;
    newIndex = newIndex === -1 ? type.length - 1 : newIndex;
    // TODO:  fix doesn't smell right
    this.openFiles.splice(openIndex, 1, {
      viewer: 'na',
      ...type[newIndex],
      lastClicked: true,
      openIndex,
      width,
      height,
      top,
      left,
    });
  }

  // emitted from taskbar to maximize window
  maximizeWindow(project: any) {
    this.childrenFolder.toArray()[project.openIndex].maximize();
    this.setLastClicked(project);
  }

  // For having windows open with random dimensions and placement
  getRandom() {
    // if small screen open full width and height
    if (window.innerWidth < 700) {
      const height = window.innerHeight - 40;
      const width = window.innerWidth;
      return { height, width, left: 0, top: 0 };
    }
    const plus = window.innerWidth / 4;
    const height = Math.floor(Math.random() * 200) + plus;
    const width = height + 100;
    const top = Math.floor(Math.random() * 200) + 50;
    const left = Math.floor(Math.random() * plus) + plus / 12;
    return { height, width, top, left };
  }

  // push selected file to openFiles and add index for keeping track of file
  openFile(data: any) {
    if (!data) {
      return;
    }
    const { length } = this.openFiles;
    data.openIndex = length;
    const updated = { ...data, ...this.getRandom() };
    this.openFiles.push(updated);
    this.setLastClicked(updated);
  }

  // sets lastClicked for making last selected viewer on top
  // TODO other previous windows need to be on top in order of last viewed
  setLastClicked(data: any) {
    this.openFiles.map((file) => {
      if (file.openIndex === data.openIndex) {
        file.lastClicked = true;
        return;
      }
      file.lastClicked = false;
    });
  }

  // removes file from openFiles when window closed
  windowClosed(project: any) {
    this.openFiles.splice(project.openIndex, 1);
    this.openFiles.map((file, index) => {
      file.openIndex = index;
      return file;
    });
  }

  // opens folder and passes in data
  openDesktopFolder(item: any) {
    const { name } = item;
    const newItem = { ...item, ...this.getRandom() };
    if (newItem.viewer === 'doc') {
      newItem.openIndex = this.openFiles.length;
      this.openFiles.push(newItem);
      this.setLastClicked(newItem);
      return;
    }
    const type = () => {
      if (name === 'animations') {
        return [...this.animations];
      }
      if (name === 'icons') {
        return [...this.icons];
      }
      return [...this.portfolio];
    };
    const items = type();
    const { height, width, top, left } = this.getRandom();
    // TODO:  fix doesn't smell right
    const builtItem = {
      lastClicked: true,
      items,
      viewer: item.viewer,
      name: name,
      openIndex: this.openFiles.length,
      height,
      width,
      top,
      left,
    };
    this.openFiles.push(builtItem);
    this.setLastClicked(builtItem);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
