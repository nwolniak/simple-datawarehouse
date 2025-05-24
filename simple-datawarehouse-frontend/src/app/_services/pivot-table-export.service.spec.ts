import { TestBed } from '@angular/core/testing';

import { PivotTableExportService } from './pivot-table-export.service';

describe('PivotTableExportService', () => {
  let service: PivotTableExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PivotTableExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
