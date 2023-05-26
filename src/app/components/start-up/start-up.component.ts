import { Component } from '@angular/core';
import { wait } from '../../helpers/helper';
import packageInfo from '../../../../package.json';
@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.sass'],
})
export class StartUpComponent {
  hideStart: boolean = true;
  version: string = packageInfo.version;
  ngOnInit() {
    this.hideStartUp();
  }

  hideStartUp = async () => {
    await wait(0);
    this.hideStart = true;
  };
}
