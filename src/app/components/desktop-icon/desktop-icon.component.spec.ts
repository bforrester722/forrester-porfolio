import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DesktopIconComponent } from './desktop-icon.component';
import { DataService } from '../../core';

describe('DesktopIconComponent', () => {
  let component: DesktopIconComponent;
  let fixture: ComponentFixture<DesktopIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopIconComponent],
      providers: [DataService, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
