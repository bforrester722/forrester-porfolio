import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  IStartMenu,
  IAnimation,
  IDesktopIcon,
} from '../../app/shared/interfaces';

@Injectable()
export class DataService {
  baseUrl: string = 'assets/';

  constructor(private http: HttpClient) {}

  // called by desktop-icon to get desktop json
  getDesktopIcons(): Observable<IDesktopIcon[]> {
    return this.http
      .get<IDesktopIcon[]>(this.baseUrl + 'desktop.json')
      .pipe(catchError(this.handleError));
  }

  // called by taskbar to get start-menu from json
  getStartMenu(): Observable<IStartMenu[]> {
    return this.http
      .get<IStartMenu[]>(this.baseUrl + 'start-menu.json')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => new Error(errMessage));
      // Use the following instead if using lite-server
      // return throwError(err.text() || 'backend server error');
    }
    return throwError(() => new Error(error || 'Node.js server error'));
  }
}
