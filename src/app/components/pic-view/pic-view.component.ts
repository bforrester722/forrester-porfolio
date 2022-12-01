import { Component, Input } from '@angular/core';
import { ProjectService } from '../../core/project.service';

@Component({
  selector: 'app-pic-view',
  templateUrl: './pic-view.component.html',
  styleUrls: ['./pic-view.component.sass'],
})
export class PicViewComponent {
  @Input() project: any;

  constructor(private projectService: ProjectService) {}

  // emits up to app component to change selected project
  arrowClicked(operator: number) {
    const { index } = this.project;
    const payload = { ...this.project, index: index + operator };
    this.projectService.updateProject(payload);
  }
}
