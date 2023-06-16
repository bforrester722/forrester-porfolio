import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../core';
import { MacTaskbarComponent } from './mac-taskbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('MacTaskbarComponent', () => {
  let component: MacTaskbarComponent;
  let fixture: ComponentFixture<MacTaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacTaskbarComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(MacTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
