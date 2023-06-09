import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../../core/data.service';
import { IDesktopIcon } from '../../shared/interfaces';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { wait } from 'app/helpers/helper';
@Component({
  selector: 'app-mac-taskbar',
  templateUrl: './mac-taskbar.component.html',
  styleUrls: ['./mac-taskbar.component.sass'],
})
export class MacTaskbarComponent {
  @Input() openFiles: any;
  @Output() maximize: EventEmitter<string> = new EventEmitter<string>();
  @Output() iconClicked: EventEmitter<IDesktopIcon> =
    new EventEmitter<IDesktopIcon>();
  icons: IDesktopIcon[] = [];
  isOpen = '';
  boxOptions: any = { paused: true, loop: false };

  constructor(
    private dataService: DataService,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    // gets desktop icons from desktop.json
    this.dataService.getDesktopIcons().subscribe((desktop: IDesktopIcon[]) => {
      this.icons = desktop;
    });
  }

  async desktopIconClicked(item: any) {
    this.analytics.logEvent('custom_event', { desktopIconClicked: item.name });
    this.maximize.emit(item);
    if (this.isOpen) return;
    this.isOpen = item.name;

    this.iconClicked.emit(item);
    await wait(700);
    this.isOpen = '';
  }
}
