import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../core/data.service';
import { IDesktopIcon } from '../../shared/interfaces';

@Component({
  selector: 'app-desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrls: ['./desktop-icon.component.sass'],
})
export class DesktopIconComponent implements OnInit {
  icons: IDesktopIcon[] = [];
  @Output() iconClicked: EventEmitter<IDesktopIcon> =
    new EventEmitter<IDesktopIcon>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // gets desktop icons from desktop.json
    this.dataService.getDesktopIcons().subscribe((desktop: IDesktopIcon[]) => {
      this.icons = desktop;
    });
  }

  // emits to app.component to open selected icon file/s
  desktopIconClicked(item: IDesktopIcon) {
    this.iconClicked.emit(item);
  }
}
