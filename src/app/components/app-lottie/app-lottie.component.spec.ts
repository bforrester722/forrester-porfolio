import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLottieComponent } from './app-lottie.component';

describe('AppLottieComponent', () => {
  let component: AppLottieComponent;
  let fixture: ComponentFixture<AppLottieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLottieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
