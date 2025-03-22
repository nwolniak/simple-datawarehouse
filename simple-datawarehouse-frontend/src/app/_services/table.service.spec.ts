import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {Table} from "@app/_models";
import {environment} from "@environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {TableService} from "@app/_services/table.service";
import {AlertService} from "@app/_services/alert.service";

describe('TableService', () => {
  let service: TableService;
  let httpMock: HttpTestingController;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(TableService);
    httpMock = TestBed.inject(HttpTestingController);
    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should query table successfully', () => {
    const tableName = 'tableName';
    const expectedResponse: Table = {
      tableName: '',
      columnList: [],
      rowList: [],
      columnOptions: [],
      selectedColumns: [],
      selectedRows: [],
      query: '',
    };

    const tableSubjectSpy = spyOn(service['tableSubject'], 'next');
    spyOn(console, 'info');

    service.getTable(tableName).subscribe(response => {
      expect(console.info).toHaveBeenCalledWith('Table request success.');
      expect(response).toEqual(expectedResponse);
      expect(tableSubjectSpy).toHaveBeenCalledWith(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.tablesUrl}/${tableName}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(expectedResponse, {status: 200, statusText: 'ok'});
  });

  it('should handle error response when querying table', () => {
    const tableName = 'tableName';
    const expectedResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'Test error message',
      status: 500,
      statusText: 'Bad Request',
      url: `${environment.tablesUrl}/${tableName}`
    });

    spyOn(alertServiceSpy, 'addAlert');
    spyOn(console, 'error');

    service.getTable(tableName).subscribe({
      next: () => fail('Expected an error, but got success response'),
      error: (error) => {
        expect(console.error).toHaveBeenCalledWith('Table request error:', expectedResponse);
        expect(alertServiceSpy.addAlert).toHaveBeenCalledWith(expectedResponse);
        expect(error).toBeTruthy();
        expect(error.error).toEqual(expectedResponse);
      }
    });

    const req = httpMock.expectOne(`${environment.tablesUrl}/${tableName}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);
    req.flush(expectedResponse, {status: 500, statusText: 'Bad Request'});
  });
})
