import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'app/core/data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TaskbarComponent } from './taskbar.component';

describe('TaskbarComponent', () => {
  let component: TaskbarComponent;
  let fixture: ComponentFixture<TaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskbarComponent],
      providers: [DataService, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
