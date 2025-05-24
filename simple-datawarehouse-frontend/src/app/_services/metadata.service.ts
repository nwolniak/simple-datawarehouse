import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {Metadata} from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private metadataSubject: BehaviorSubject<Metadata | undefined>;
  metadata$: Observable<Metadata | undefined>;

  constructor(private http: HttpClient) {
    this.metadataSubject = new BehaviorSubject<Metadata | undefined>(undefined);
    this.metadata$ = this.metadataSubject.asObservable();
  }

  public get metadata(): Metadata | undefined {
    return this.metadataSubject.getValue();
  }

  requestDatawarehouseMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${environment.metadataUrl}`).pipe(
      tap((metadata: Metadata) => {
        console.info('Metadata fetched successfully.');
        this.metadataSubject.next(metadata);
      }),
      catchError(error => {
        console.error('Metadata fetch error:', error.error);
        return throwError(() => error);
      })
    );
  }

  reset() {
    this.metadataSubject.next(this.metadataSubject.value);
  }

}
