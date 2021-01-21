import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicViewComponent } from './pic-view.component';

describe('PicViewComponent', () => {
  let component: PicViewComponent;
  let fixture: ComponentFixture<PicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
