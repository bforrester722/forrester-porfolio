import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocViewComponent } from './doc-view.component';
import { project } from './__mocks__/doc-view-test.component';

describe('DocViewComponent', () => {
  let component: DocViewComponent;
  let fixture: ComponentFixture<DocViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewComponent);
    component = fixture.componentInstance;
    component.project = project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
