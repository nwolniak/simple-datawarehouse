import {ConnectionService} from "@app/_services/connection.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {ConnectionParameters} from "@app/_models";
import {environment} from "@environments/environment";

describe('ConnectionService', () => {
  let service: ConnectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ConnectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should connect successfully', () => {
    const connectionParameters: ConnectionParameters = {
      driverClassName: environment.driverClassName,
      driver: environment.driver,
      host: environment.host,
      port: environment.port,
      database: environment.database,
      username: environment.username,
      password: environment.password
    };

    const expectedResponse = {status: 'success'};

    spyOn(console, 'info');

    service.connectToDatabase(connectionParameters).subscribe(response => {
      expect(console.info).toHaveBeenCalledWith('Connect to database success.');
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(environment.dbConnectionUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(connectionParameters);
    req.flush(null, {status: 200, statusText: 'ok'});
  });

  it('should handle error response when connecting', () => {
    const connectionParameters: ConnectionParameters = {
      driverClassName: environment.driverClassName,
      driver: environment.driver,
      host: environment.host,
      port: environment.port,
      database: environment.database,
      username: environment.username,
      password: environment.password
    };

    const expectedResponse = 'Database connection failed';

    spyOn(console, 'error');

    service.connectToDatabase(connectionParameters).subscribe({
      next: () => fail('Expected an error, but got success response'),
      error: (error) => {
        expect(console.error).toHaveBeenCalledWith('Connect to database error:', expectedResponse);
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
        expect(error.error).toBe(expectedResponse);
      }
    });

    const req = httpMock.expectOne(environment.dbConnectionUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(connectionParameters);
    req.flush(expectedResponse, {status: 500, statusText: 'Internal Server Error'});
  });

})
