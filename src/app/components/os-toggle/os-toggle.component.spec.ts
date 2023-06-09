import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OsToggleComponent } from './os-toggle.component';

describe('OsToggleComponent', () => {
  let component: OsToggleComponent;
  let fixture: ComponentFixture<OsToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OsToggleComponent],
      imports: [MatButtonToggleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OsToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
