import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { DesktopIconComponent } from './desktop-icon.component';
import { DataService } from '../../core';
import desktopIcons from '../../../assets/desktop.json';

describe('DesktopIconComponent', () => {
  let component: DesktopIconComponent;
  let fixture: ComponentFixture<DesktopIconComponent>;
  let deElement: DebugElement;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopIconComponent],
      imports: [MatIconModule, HttpClientTestingModule],
      providers: [DataService, MatIconModule, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopIconComponent);
    deElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.icons = desktopIcons;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dataService = new DataService(httpClientSpy);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dataService ', () => {
    it('should return expected icons (HttpClient called once)', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(desktopIcons));

      dataService.getDesktopIcons().subscribe({
        next: (icons) => {
          expect(icons).withContext('expected icons').toEqual(desktopIcons);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });
  });

  describe('Desktop Icon ', () => {
    it('every icon should have a title ', fakeAsync(() => {
      const titles = deElement.nativeElement.querySelectorAll('.title');
      const titlesText = [...titles].map((title: any) => title.innerText);
      expect(titlesText.find((title) => !title)).toBeFalsy();
    }));

    it('desktop icons not in DOM if !desktopIcons', fakeAsync(() => {
      component.icons = [];
      fixture.detectChanges();
      const btn = deElement.nativeElement.querySelectorAll('mat-icon');
      expect(btn[0]).toBeFalsy();
    }));

    it('desktopIconClicked() called on mat-icon clicked', fakeAsync(() => {
      spyOn(component, 'desktopIconClicked'); //method attached to the click.
      const btn = deElement.nativeElement.querySelectorAll('mat-icon');
      btn[0].click();
      tick();
      expect(component.desktopIconClicked).toHaveBeenCalled();
    }));

    it('should emit correct desktopIcon based on icon clicked', () => {
      spyOn(component.iconClicked, 'emit');
      const randomIcon = Math.floor(Math.random() * component.icons.length);
      // trigger the click
      const btns = deElement.nativeElement.querySelectorAll('mat-icon');
      btns[randomIcon].click();
      fixture.detectChanges();
      expect(component.iconClicked.emit).toHaveBeenCalledWith(
        desktopIcons[randomIcon]
      );
    });
  });
});
