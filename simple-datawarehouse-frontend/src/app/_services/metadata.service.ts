import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Metadata } from '@app/_models';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private metadataSubject: BehaviorSubject<Metadata | undefined>;
  private readonly _metadata: Observable<Metadata | undefined>;

  constructor(private http: HttpClient) {
    this.metadataSubject = new BehaviorSubject<Metadata | undefined>(undefined);
    this._metadata = this.metadataSubject.asObservable();
  }

  public get metadata(): Observable<Metadata | undefined> {
    return this._metadata;
  }

  getDatawarehouseMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${environment.metadataUrl}`).pipe(
      map((metadata) => {
        this.metadataSubject.next(metadata);
        return metadata;
      }),
    );
  }
}
