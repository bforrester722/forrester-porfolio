import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../core/data.service';
import { IDesktopIcon } from '../../shared/interfaces';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrls: ['./desktop-icon.component.sass'],
})
export class DesktopIconComponent implements OnInit {
  boxOptions: any = { paused: true, loop: false };
  icons: IDesktopIcon[] = [];
  @Output() iconClicked: EventEmitter<IDesktopIcon> =
    new EventEmitter<IDesktopIcon>();

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

  // used to play and reverse animation on hover
  hover(paused: boolean, name: string) {
    this.boxOptions = { ...this.boxOptions, paused, name };
  }

  // emits to app.component to open selected icon file/s
  desktopIconClicked(item: IDesktopIcon) {
    this.analytics.logEvent('custom_event', { desktopIconClicked: item.name });
    this.iconClicked.emit(item);
  }
}
