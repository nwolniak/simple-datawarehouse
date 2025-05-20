import { TestBed } from '@angular/core/testing';

import { PivotQueryService } from './pivot-query.service';

describe('PivotQueryService', () => {
  let service: PivotQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PivotQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
