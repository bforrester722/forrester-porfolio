import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ElementRef,
} from '@angular/core';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DataService } from '../../core/data.service';
import { IDesktopIcon } from '../../shared/interfaces';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { wait } from 'app/helpers/helper';
import { OpenFilesService } from 'app/shared/services/open-files.service';

interface Data extends IDesktopIcon {
  open?: boolean;
}
@Component({
  selector: 'app-mac-taskbar',
  templateUrl: './mac-taskbar.component.html',
  styleUrls: ['./mac-taskbar.component.sass'],
  animations: [
    trigger('folderInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),

        animate(
          '300ms cubic-bezier(0.35, 0, 0.25, 1)',
          keyframes([
            style({ opacity: 0, transform: 'translateY(64px)' }),
            style({ opacity: 1, transform: 'translateY(0)' }),
          ])
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),

        animate(
          '100ms cubic-bezier(0.35, 0, 0.25, 1)',
          keyframes([
            style({ opacity: 1, transform: 'translateY(0)' }),
            style({ opacity: 0, transform: 'translateY(64px)' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class MacTaskbarComponent {
  @Output() maximize: EventEmitter<string> = new EventEmitter<string>();
  @Output() iconClicked: EventEmitter<IDesktopIcon> =
    new EventEmitter<IDesktopIcon>();

  // closes opened if clicked outside of area
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showOpened = false;
    }
  }
  icons: Data[] = [];
  animate = '';
  boxOptions: any = { paused: true, loop: false };
  openFiles: any = [];
  opened: any = [];
  showOpened: boolean = false;

  constructor(
    private dataService: DataService,
    private elementRef: ElementRef,
    private analytics: AngularFireAnalytics,
    private openFilesService: OpenFilesService
  ) {}

  ngOnInit(): void {
    // gets desktop icons from desktop.json
    this.dataService.getDesktopIcons().subscribe((desktop: IDesktopIcon[]) => {
      this.icons = desktop;
    });

    this.openFilesService.subscribe((data) => {
      this.openFiles = data;
      this.checkPicOpen(data);
    });
  }

  // catch changes to update animation
  ngOnChanges(changes: any) {
    this.icons.forEach((icon, index) => {
      const found = changes.openFiles.currentValue.find(
        (file: any) => file.name === icon.name
      );
      found
        ? (this.icons[index] = { ...this.icons[index], open: true })
        : (this.icons[index] = { ...this.icons[index], open: false });
    });
  }
  checkPicOpen(data: any) {
    this.icons.forEach((icon, index) => {
      const found = data.find((file: any) => file.name === icon.name);
      found
        ? (this.icons[index] = { ...this.icons[index], open: true })
        : (this.icons[index] = { ...this.icons[index], open: false });
    });
    const viewer = data?.filter((change: any) => change?.viewer === 'pic');
    this.opened = viewer;
  }

  openedClicked() {
    this.showOpened = !this.showOpened;
  }

  openedIconClicked(item: any) {
    this.maximize.emit(item);
    this.showOpened = !this.showOpened;
  }

  async desktopIconClicked(item: any) {
    this.analytics.logEvent('custom_event', { desktopIconClicked: item.name });
    const newItem = this.openFiles.find((file: any) => file.name === item.name);
    this.maximize.emit(newItem ? newItem : item);

    if (this.animate) return;
    this.animate = item.name;

    this.iconClicked.emit(newItem ? newItem : item);
    await wait(700);

    this.animate = '';
  }
}
