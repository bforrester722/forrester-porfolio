import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OsService {
  os: string = 'mac';

  private osInfo = new BehaviorSubject<any>('mac');

  setOs(os: 'mac' | 'windows') {
    this.osInfo.next(os);
  }

  getOs() {
    return this.osInfo.getValue();
  }

  subscribe(callback: (data: string) => void) {
    return this.osInfo.asObservable().subscribe(callback);
  }
}
