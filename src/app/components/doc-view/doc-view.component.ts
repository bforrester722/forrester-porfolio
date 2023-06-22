import { Component, Input } from '@angular/core';
import { IDesktopIcon } from 'app/shared/interfaces';
import { OsService } from 'app/shared/services/os.service';

@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.sass'],
})
export class DocViewComponent {
  // comes from window width
  @Input() width: number = 0;
  @Input() project: any;
  os: string = '';

  constructor(private osService: OsService) {}

  ngOnInit() {
    // this.os = this.osService.getOs();
    // used to hide all other cards in html
    this.osService.subscribe((data) => {
      this.os = data;
    });
  }
}
