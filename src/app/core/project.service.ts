import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  
  // taskbar route
  private subject = new Subject<any>();

  // called from pic-viewer when arrow clicked
  updateProject(message: object) {
    this.subject.next(message);
  }

  // used in app to get when pic/animations changed
  getProject(): Observable<any> {
    return this.subject.asObservable();
  }


  // desktop route
  private open = new Subject<any>();

  // folder-items set project to open
  setProject(message: object) {
    this.open.next(message);
  }

  // observed in app when to open project 
  openProject(): Observable<any> {
    return this.open.asObservable();
  }
}