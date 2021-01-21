import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ProjectService } from '../../core/project.service';

@Component({
  selector: 'app-folder-items',
  templateUrl: './folder-items.component.html',
  styleUrls: ['./folder-items.component.sass']
})
export class FolderItemsComponent{

  @Input() files: any;
  @Output() iconClicked: EventEmitter<object> = new EventEmitter<object>();
  
  constructor(private projectService: ProjectService) { }

  // uses service to set selected file for app.component to open it
  folderIconClicked(item: any) {
    this.projectService.setProject(item);
  }

}
