import { Component } from '@angular/core';
import { OsService } from 'app/shared/services/os.service';

@Component({
  selector: 'app-os-toggle',
  templateUrl: './os-toggle.component.html',
  styleUrls: ['./os-toggle.component.sass'],
})
export class OsToggleComponent {
  constructor(private osService: OsService) {}

  onOsChange(value: 'mac' | 'windows') {
    this.osService.setOs(value);
  }
}
