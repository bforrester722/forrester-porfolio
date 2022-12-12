import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectService } from '../../core/project.service';
import { PicViewComponent } from './pic-view.component';
import { project } from './__mocks__/pic-view-test.component';
describe('PicViewComponent', () => {
  let component: PicViewComponent;
  let fixture: ComponentFixture<PicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicViewComponent],
      providers: [ProjectService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicViewComponent);
    component = fixture.componentInstance;
    component.project = project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
