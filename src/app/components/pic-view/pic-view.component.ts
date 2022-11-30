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
  arrowClicked(operator: string) {
    const { index } = this.project;
    console.log(this.project);
    const getIndex = () => {
      if (operator === '+') {
        return index + 1;
      }
      return index - 1;
    };
    const payload = { ...this.project, index: getIndex() };
    this.projectService.updateProject(payload);
  }
}
