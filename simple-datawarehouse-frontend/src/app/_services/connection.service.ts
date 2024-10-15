import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionParameters } from '@app/_models';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  connectToDatabase(
    connectionParameters: ConnectionParameters,
  ): Observable<any> {
    return this.http.post(
      `${environment.dbConnectionUrl}`,
      connectionParameters,
    );
  }
}
