import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  DesktopIconComponent,
  StartUpComponent,
  TaskbarComponent,
  WindowComponent,
} from './components';
import { DataService, FirestoreService, ProjectService } from './core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
        DesktopIconComponent,
        StartUpComponent,
        TaskbarComponent,
        WindowComponent,
      ],

      providers: [
        DataService,
        FirestoreService,
        ProjectService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
