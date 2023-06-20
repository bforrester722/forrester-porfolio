import { TestBed } from '@angular/core/testing';

import { OpenFilesService } from './open-files.service';

describe('OpenFilesService', () => {
  let service: OpenFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
