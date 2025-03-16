import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {Metadata, TableMetadata} from "@app/_models";
import {environment} from "@environments/environment";
import {MetadataService} from "@app/_services/metadata.service";

describe('MetadataService', () => {
  let service: MetadataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MetadataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should fetch metadata successfully', () => {
    const expectedResponse: Metadata = {
      host: 'host',
      database: 'database',
      tables: [],
      factTables: [],
      dimTables: new Map<string, TableMetadata[]>(),
    };

    spyOn(console, 'info');

    service.getDatawarehouseMetadata().subscribe(response => {
      expect(console.info).toHaveBeenCalledWith('Metadata fetched successfully.');
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(environment.metadataUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResponse, {status: 200, statusText: 'ok'});
  });

  it('should handle error response when fetching metadata', () => {
    const expectedResponse = 'Metadata unavailable';

    spyOn(console, 'error');

    service.getDatawarehouseMetadata().subscribe({
      next: () => fail('Expected an error, but got success response'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
        expect(error.error).toBe(expectedResponse);
        expect(console.error).toHaveBeenCalledWith('Metadata fetch error:', expectedResponse);
      }
    });

    const req = httpMock.expectOne(environment.metadataUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedResponse, {status: 500, statusText: 'Internal Server Error'});
  });

})
