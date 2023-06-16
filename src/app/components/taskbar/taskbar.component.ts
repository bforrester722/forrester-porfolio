import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { wait } from '../../helpers/helper';
import { DataService } from '../../core/data.service';
import {
  IStartMenu,
  ISecondMenu,
  IIcons,
  IAnimation,
} from '../../shared/interfaces';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.sass'],
})
export class TaskbarComponent implements OnInit {
  @Input() icons: IIcons[] = [];
  @Input() animations: IAnimation[] = [];
  @Input() openFiles: any;
  @Input() portfolio: any;
  @Output() selected: EventEmitter<object> = new EventEmitter<object>();
  @Output() maximize: EventEmitter<string> = new EventEmitter<string>();
  appTime: string = '';
  appDate: string = '';
  cached: string = '';
  openStart: boolean = false;
  openSecond: boolean = false;
  secondMenu: ISecondMenu[] = [];
  startMenuItems: IStartMenu[] = [];

  // closes start menus if clicked outside of them
  @HostListener('window:click', ['$event'])
  handleClick(event: any) {
    const close = event.target.classList.contains('dont-close');
    if (!close) {
      this.closeMenus();
    }
  }

  // constructor(private dataService: DataService, ) {}
  constructor(private dataService: DataService) {
    // updates date and time every second
    setInterval(() => {
      this.setDate();
    }, 1000);
  }

  ngOnInit(): void {
    this.setDate();
    // gets start menu items from start-menu.json
    this.dataService.getStartMenu().subscribe((start: IStartMenu[]) => {
      this.startMenuItems = start;
    });
  }

  // sets width on open tabs based on number of files openFiles
  // adds styles to active tab
  styleTab(project: any): Object {
    const width =
      (window.innerWidth - (200 + 22 * this.openFiles.length)) /
      this.openFiles.length;
    const openWidth = width > 200 ? 200 : width;
    if (project.lastClicked) {
      return {
        width: `${openWidth}px`,
        background: '#d3d3d3',
        boxShadow: 'inset 2px 2px 2px black, inset -2px -2px 2px white',
      };
    }
    return { width: `${openWidth}px` };
  }

  // sets date and time for taskbar
  setDate() {
    let date = new Date();
    this.appDate =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    this.appTime = date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // if start menu closed open it else close all menus
  startClicked() {
    if (!this.openStart) {
      this.openStart = true;
      return;
    }
    this.closeMenus();
  }

  // selects second menu items
  getSecondMenuItems(name: string) {
    switch (name) {
      case 'animations':
        return this.animations;
      case 'icons':
        return this.icons;
      case 'portfolio':
        return this.portfolio;
    }
  }

  // Closes previous second menu if open then open second Menu
  async startMenuItemClicked(name: string) {
    if (this.cached !== name) {
      this.openSecond = false;
      await wait(250);
    }
    this.cached = name;

    this.openSecond = !this.openSecond;
    this.secondMenu = this.getSecondMenuItems(name);
  }

  // used to maximize window when tab clicked
  tabClicked(item: any) {
    this.maximize.emit(item);
  }

  // closes menus then emits up to app to open correct viewer
  async secondMenuItemClicked(project: object) {
    this.closeMenus();
    this.selected.emit(project);
  }

  // closes menus
  async closeMenus() {
    this.openSecond = false;
    await wait(150);
    this.openStart = false;
  }
}
