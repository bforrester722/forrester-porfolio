import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FolderItemsComponent } from './folder-items.component';
import { ProjectService } from 'app/core';
import { files } from './__mocks__/folder-items-test.component';

describe('FolderItemsComponent', () => {
  let component: FolderItemsComponent;
  let fixture: ComponentFixture<FolderItemsComponent>;
  let deElement: DebugElement;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FolderItemsComponent],
      imports: [HttpClientTestingModule],
      providers: [ProjectService, HttpClient],
    }).compileComponents();
    fixture = TestBed.createComponent(FolderItemsComponent);

    component = fixture.componentInstance;
    deElement = fixture.debugElement;
    component.files = files;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('dataService ', () => {
  //   it('should return expected icons (HttpClient called once)', (done: DoneFn) => {
  //     httpClientSpy.get.and.returnValue(of(desktopIcons));

  //     projectService.).subscribe({
  //       next: (icons) => {
  //         expect(icons).withContext('expected icons').toEqual(desktopIcons);
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  //   });
  // });

  describe('Folder Icon ', () => {
    // it('every icon should have a title ', fakeAsync(() => {
    //   const titles = deElement.nativeElement.querySelectorAll('.title');
    //   const titlesText = [...titles].map((title: any) => title.innerText);
    //   expect(titlesText.find((title) => !title)).toBeFalsy();
    // }));

    // it('desktop icons not in DOM if !desktopIcons', fakeAsync(() => {
    //   component.icons = [];
    //   fixture.detectChanges();
    //   const btn = deElement.nativeElement.querySelectorAll('mat-icon');
    //   expect(btn[0]).toBeFalsy();
    // }));

    it('folderIconClicked() called on folder-icon clicked', fakeAsync(() => {
      spyOn(component, 'folderIconClicked'); //method attached to the click.
      const btns = deElement.nativeElement.querySelectorAll('.folder-icon');
      btns[0].click();
      tick();
      expect(component.folderIconClicked).toHaveBeenCalled();
    }));

    it('#getObservableValue should return value from observable', async () => {
      // console.log('prsdfo', projectService.setProject);
      const randomIcon = Math.floor(Math.random() * component.files.length);
      // trigger the click
      const btns = deElement.nativeElement.querySelectorAll('.folder-icon');
      // spyOn(projectService, 'getProject').and.returnValue(files[randomIcon])
      btns[randomIcon].click();

      // tick();
      fixture.detectChanges();
      projectService.getProject().subscribe((value) => {
        expect(value).toBe(files[randomIcon]);
        // done();
      });
    });

    // it('should emit correct desktopIcon based on icon clicked', fakeAsync(() => {
    //   // expect(btns[0]).toBeTruthy();
    //   (done: DoneFn) => {
    //     console.log('prsdfo', projectService.setProject);
    //     const randomIcon = Math.floor(Math.random() * component.files.length);
    //     // trigger the click
    //     const btns = deElement.nativeElement.querySelectorAll('.folder-icon');
    //     // spyOn(projectService, 'getProject').and.returnValue(files[randomIcon])
    //     btns[randomIcon].click();

    //     tick();
    //     fixture.detectChanges();
    //     projectService.getProject().subscribe((value) => {
    //       console.log('ass');
    //       expect(value).toBe(files[randomIcon]);
    //       done();
    //     });
    //   };
    //   // expect(projectService.getProject()).toEqual(files[randomIcon]);
    //   // expect(projectService.setProject).toHaveBeenCalledWith(files[randomIcon]);
    // }));
  });
});
