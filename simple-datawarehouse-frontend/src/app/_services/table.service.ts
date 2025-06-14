import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Table} from '@app/_models';
import {environment} from '@environments/environment';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {AlertService} from "@app/_services/alert.service";

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private tableSubject: BehaviorSubject<Table | undefined>;
  table$: Observable<Table | undefined>;

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.tableSubject = new BehaviorSubject<Table | undefined>(undefined);
    this.table$ = this.tableSubject.asObservable();
  }

  getTable(name: string): Observable<Table> {
    return this.http.get<Table>(`${environment.tablesUrl}/${name}`)
      .pipe(
        tap((table: Table) => {
          console.info('Table request success.', table);
          this.tableSubject.next(table);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Table request error:', error.error);
          this.alertService.addAlert(error.error);
          return throwError(() => error);
        }));
  }
}
