import { TestBed } from '@angular/core/testing';

import { OsService } from './os.service';

describe('OsService', () => {
  let service: OsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
