import { TestBed } from '@angular/core/testing';

import { SubjectDestroyService } from './subject-destroy.service';

describe('SubjectDestroyService', () => {
  let service: SubjectDestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectDestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
