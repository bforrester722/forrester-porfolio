import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {
  DesktopIconComponent,
  WindowComponent,
  TaskbarComponent,
} from './components';
import { DataService, FirestoreService, ProjectService } from './core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        DesktopIconComponent,
        TaskbarComponent,
        WindowComponent,
      ],

      providers: [
        DataService,
        FirestoreService,
        HttpClient,
        HttpHandler,
        ProjectService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
