import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Metadata} from '@app/_models';
import {AnalyticsService} from "@app/_services/analytics.service";
import {TableQueryService} from "@app/_services/table-query.service";
import {PivotQueryService} from "@app/_services/pivot-query.service";

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private metadataSubject: BehaviorSubject<Metadata | undefined> = new BehaviorSubject<Metadata | undefined>(undefined);
  metadata$: Observable<Metadata | undefined> = this.metadataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tableQueryService: TableQueryService,
    private analyticsService: AnalyticsService,
    private pivotQueryService: PivotQueryService
  ) {}

  public get metadata(): Metadata | undefined {
    return this.metadataSubject.getValue();
  }

  requestDatawarehouseMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${environment.metadataUrl}`).pipe(
      tap((metadata: Metadata) => {
        console.info('Metadata fetched successfully.');
        this.tableQueryService.clear();
        this.pivotQueryService.clear();
        this.analyticsService.clear();
        this.metadataSubject.next(metadata);
      })
    );
  }

  reset() {
    this.metadataSubject.next(this.metadataSubject.value);
  }

}
