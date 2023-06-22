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
  IOpenFile,
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
  @Output() selected: EventEmitter<ISecondMenu> =
    new EventEmitter<ISecondMenu>();
  @Output() maximize: EventEmitter<IOpenFile> = new EventEmitter<IOpenFile>();

  appTime: string = '';
  appDate: string = '';
  cached: string = '';
  openStart: boolean = false;
  openSecond: boolean = false;
  openWidth: number = 200;
  secondMenu: ISecondMenu[] = [];
  startMenuItems: IStartMenu[] = [];
  newOpen: any = [];

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

  ngOnChanges(changes: any) {
    if (changes.openFiles) {
      const maxOpen = Math.max(...this.openFiles.map((o: any) => o.openIndex));
      this.newOpen = this.openFiles.map((file: any) => {
        return file.openIndex === maxOpen
          ? { ...file, lastClicked: true }
          : { ...file, lastClicked: false };
      });
      const width =
        (window.innerWidth - (200 + 22 * this.openFiles.length)) /
        this.openFiles.length;

      this.openWidth = width > 200 ? 200 : width;
    }
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
  async secondMenuItemClicked(project: ISecondMenu) {
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
