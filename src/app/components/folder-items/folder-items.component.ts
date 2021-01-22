import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { ProjectService } from '../../core/project.service';

@Component({
  selector: 'app-folder-items',
  templateUrl: './folder-items.component.html',
  styleUrls: ['./folder-items.component.sass']
})
export class FolderItemsComponent implements OnInit{

  @Input() files: any;
  @Output() iconClicked: EventEmitter<object> = new EventEmitter<object>();
  paused: Boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    // pauses autoplay if phone size
    if (window.innerWidth < 700 || window.innerHeight < 700) {
      this.paused = true;
    }
  }

  // uses service to set selected file for app.component to open it
  folderIconClicked(item: any) {
    this.projectService.setProject(item);
  }

}
