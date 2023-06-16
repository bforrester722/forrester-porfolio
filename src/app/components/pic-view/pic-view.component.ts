import { Component, Input } from '@angular/core';
import { ProjectService } from '../../core/project.service';
import { OsService } from 'app/shared/services/os.service';

@Component({
  selector: 'app-pic-view',
  templateUrl: './pic-view.component.html',
  styleUrls: ['./pic-view.component.sass'],
})
export class PicViewComponent {
  @Input() project: any;
  os: string = '';
  constructor(
    private projectService: ProjectService,
    private osService: OsService
  ) {}

  ngOnInit() {
    // this.os = this.osService.getOs();
    // used to hide all other cards in html
    this.osService.subscribe((data) => {
      this.os = data;
    });
  }

  // emits up to app component to change selected project
  arrowClicked(operator: number) {
    const { index } = this.project;
    const payload = { ...this.project, index: index + operator };
    this.projectService.updateProject(payload);
  }
}
