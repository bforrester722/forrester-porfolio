import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartUpComponent } from './start-up.component';

describe('StartUpComponent', () => {
  let component: StartUpComponent;
  let fixture: ComponentFixture<StartUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartUpComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StartUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
