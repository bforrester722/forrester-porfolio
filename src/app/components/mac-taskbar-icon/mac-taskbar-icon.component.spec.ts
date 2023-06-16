import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MacTaskbarIconComponent } from './mac-taskbar-icon.component';

describe('MacTaskbarIconComponent', () => {
  let component: MacTaskbarIconComponent;
  let fixture: ComponentFixture<MacTaskbarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MacTaskbarIconComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MacTaskbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.animateIcons = true;
    component.openFiles = [{ name: 'sdf' }];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
