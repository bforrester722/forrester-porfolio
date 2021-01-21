import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doc-view',
  templateUrl: './doc-view.component.html',
  styleUrls: ['./doc-view.component.sass']
})

export class DocViewComponent {
  // comes from window width
  @Input() width: number = 0;
  @Input() project: any;

 
}
