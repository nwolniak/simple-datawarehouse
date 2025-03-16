import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConnectionParameters} from '@app/_models';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {
  }

  connectToDatabase(connectionParameters: ConnectionParameters): Observable<any> {
    return this.http.post(`${environment.dbConnectionUrl}`, connectionParameters).pipe(
      tap(() => console.info('Connect to database success.')),
      catchError(error => {
        console.error('Connect to database error:', error.error);
        return throwError(() => error);
      }));
  }
}
