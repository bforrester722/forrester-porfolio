import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../core/project.service';
import { IFolderItem, IOpenFile } from 'app/shared/interfaces';
import { OsService } from 'app/shared/services/os.service';
@Component({
  selector: 'app-folder-items',
  templateUrl: './folder-items.component.html',
  styleUrls: ['./folder-items.component.sass'],
})
export class FolderItemsComponent implements OnInit {
  @Input() files: any[];
  paused: boolean = false;
  os: string = '';
  constructor(
    private projectService: ProjectService,
    private osService: OsService
  ) {}

  ngOnInit() {
    // pauses autoplay if phone size
    if (window.innerWidth < 700 || window.innerHeight < 700) {
      this.paused = true;
    }
    this.osService.subscribe((data) => {
      this.os = data;
    });
  }

  // uses service to set selected file for app.component to open it
  folderIconClicked(item: IFolderItem) {
    this.projectService.setProject(item);
  }
}
