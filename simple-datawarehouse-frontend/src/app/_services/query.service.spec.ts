import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {Query, Table} from "@app/_models";
import {environment} from "@environments/environment";
import {QueryService} from "@app/_services/query.service";
import {AlertService} from "@app/_services/alert.service";
import {HttpErrorResponse} from "@angular/common/http";

describe('QueryService', () => {
  let service: QueryService;
  let httpMock: HttpTestingController;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(QueryService);
    httpMock = TestBed.inject(HttpTestingController);
    alertServiceSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should query data successfully', () => {
    const queryRequest: Query = {
      columns: [],
      fromTable: '',
      joins: [],
      groupByList: [],
      havingList: [],
      orderByList: [],
      whereList: []
    };

    const expectedResponse: Table = {
      tableName: '',
      columnList: [],
      rowList: [],
      columnOptions: [],
      selectedColumns: [],
      selectedRows: [],
      query: '',
    };

    spyOn(service['tableQuerySubject'], 'getValue').and.returnValue(queryRequest);
    const tableSubjectSpy = spyOn(service['tableSubject'], 'next');
    spyOn(console, 'info');

    service.sendTableQuery();

    const req = httpMock.expectOne(environment.queryUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(queryRequest);
    req.flush(expectedResponse, {status: 200, statusText: 'ok'});
    expect(console.info).toHaveBeenCalledWith('Query request success.');
    expect(tableSubjectSpy).toHaveBeenCalledWith(expectedResponse);
  });

  it('should handle error response when querying data', () => {
    const queryRequest: Query = {
      columns: [],
      fromTable: '',
      joins: [],
      groupByList: [],
      havingList: [],
      orderByList: [],
      whereList: []
    };

    const expectedResponse: HttpErrorResponse = new HttpErrorResponse({
      error: 'Test error message',
      status: 500,
      statusText: 'Bad Request',
      url: environment.queryUrl
    });

    spyOn(service['tableQuerySubject'], 'getValue').and.returnValue(queryRequest);
    spyOn(alertServiceSpy, 'addAlert');
    spyOn(console, 'error');

    service.sendTableQuery();

    const req = httpMock.expectOne(environment.queryUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(queryRequest);
    req.flush(expectedResponse, {status: 500, statusText: 'Bad Request'});
    expect(console.error).toHaveBeenCalledWith('Query request error:', expectedResponse);
    expect(alertServiceSpy.addAlert).toHaveBeenCalledWith(expectedResponse);
  });

})
