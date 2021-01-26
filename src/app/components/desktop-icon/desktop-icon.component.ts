import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from  '../../core/data.service';
import { IDesktopIcon } from '../../shared/interfaces';

@Component({
  selector: 'app-desktop-icon',
  templateUrl: './desktop-icon.component.html',
  styleUrls: ['./desktop-icon.component.sass']
})

export class DesktopIconComponent implements OnInit {

  icons: IDesktopIcon[] = [];
  @Output() iconClicked: EventEmitter<object> = new EventEmitter<object>();
  

  constructor(private dataService: DataService	) { }

  ngOnInit(): void {
    // gets desktop icons from desktop.json
	  this.dataService.getDesktopIcons().subscribe((desktop: any) => {
			this.icons = desktop;
    });
  }

  // emits to app.component to open selected icon file/s
  desktopIconClicked(item: any) {
    this.iconClicked.emit(item);
  }

}
