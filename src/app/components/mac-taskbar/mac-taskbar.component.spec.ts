import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacTaskbarComponent } from './mac-taskbar.component';

describe('MacTaskbarComponent', () => {
  let component: MacTaskbarComponent;
  let fixture: ComponentFixture<MacTaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacTaskbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
